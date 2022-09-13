<template>
	<button v-if="showClose" @click="closeAppPWA" class="close-app">&#10006;</button>
	<transition name="net" appear>
		<NetDisconnect v-if="netStatus === 'offline'" />
	</transition>
	<transition name="ongoing" appear>
		<OngoingSession v-if="ongoingSession.is && securityCheckPassed" :data="ongoingSession.data" />
	</transition>

	<TheHeader v-if="securityCheckPassed" />

	<transition name="showUp" appear>
		<div v-if="securityCheckPassed" class="container">
			<Sessions />
			<Error v-if="isError" :message="errorMessage" />
		</div>
	</transition>
	<SecurityBox :authError="authError" @requestAuth="handleAuth" v-if="!securityCheckPassed && !initialCheck" />
</template>

<script setup lang="ts">
import { defineAsyncComponent, onBeforeMount, ref } from 'vue';
import { AuthError } from '../types';
import { BASE_URL } from './cfg';
import { isError, errorMessage, ongoingSession, netStatus } from './store';
import handleNet from './composables/handleNet';

const securityCheckPassed = ref<boolean>(false);
const initialCheck = ref(true);

// dynamic components. Get imported only when authenticated.
const SecurityBox = defineAsyncComponent(() => import('./components/Security.vue'));
const OngoingSession = defineAsyncComponent(() => import('./components/OngoingSession.vue'));
const Sessions = defineAsyncComponent(() => import('./components/Sessions.vue'));
const TheHeader = defineAsyncComponent(() => import('./components/TheHeader.vue'));
const Error = defineAsyncComponent(() => import('./components/Error.vue'));
const authError = ref<AuthError>({ is: false });

onBeforeMount(async () => {
	handleNet();
	const code = localStorage.getItem('pass');
	if (code) securityCheckPassed.value = true;
	else initialCheck.value = false;

	if (securityCheckPassed.value === true) {
		const getOngoing = (await import('./composables/ongoing/getOngoing')).default;
		const resetOngoing = (await import('./composables/ongoing/resetOngoing')).default;
		const ongoing = getOngoing();
		if (ongoing !== null) {
			ongoingSession.value = {
				is: ongoing.is,
				data: ongoing.data
			};
		} else resetOngoing();
	}
});
async function handleAuth(pass: string) {
	try {
		if (pass !== '') {
			const response = await (
				await fetch(`${BASE_URL}/auth`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ pass })
				})
			).json();

			if (response === 'passed') {
				securityCheckPassed.value = true;
				localStorage.setItem('pass', Math.random().toString(36).slice(2));
			} else {
				authError.value = {
					is: true
				};
			}
		}
	} catch (error) {
		authError.value = {
			is: true,
			status: 'Error occurred'
		};
	}
}
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js');

const showClose = window.matchMedia('(display-mode: standalone)').matches ? true : false;

const closeAppPWA = () => window.close();
</script>

<style lang="scss">
@use '@/assets/sass/main.scss';

.showUp-enter-active,
.showUp-leave-active {
	transition: opacity 500ms ease-in-out, transform 500ms ease-in-out;
	transform: translateY(0px);
}

.showUp-enter-from,
.showUp-leave-to {
	opacity: 0;
	transform: translateY(20px);
}
</style>
