<template>
	<button @click="closeApp" v-if="showClose" class="close-app">&#10006;</button>
	<TheHeader v-if="securityCheckPassed" />
	<transition name="showUp">
		<div v-if="securityCheckPassed" class="container">
			<Sessions />
			<Error v-if="isError" :message="errorMessage" />
		</div>
	</transition>
	<SecurityBox :authError="authError" @requestAuth="handleAuth" v-if="!securityCheckPassed && !initialCheck" />
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from 'vue';
import { BASE_URL } from './cfg';
import { isError, errorMessage } from './store';
const securityCheckPassed = ref(false);
const initialCheck = ref(true);
const SecurityBox = defineAsyncComponent(() => import('./components/Security.vue'));
const authError = ref<{
	is: boolean;
	status?: string;
}>({ is: false });
onMounted(() => {
	const code = localStorage.getItem('pass');
	if (code) return (securityCheckPassed.value = true);
	else return (initialCheck.value = false);
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
			status: 'Error ocured'
		};
	}
}
if ('scrollRestoration' in history) {
	history.scrollRestoration = 'manual';
}
if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js');

const showClose = window.matchMedia('(display-mode: standalone)').matches ? true : false;

function closeApp() {
	close();
}
</script>

<style lang="scss">
@use '@/assets/sass/main.scss';

.showUp-enter-active,
.showUp-leave-active {
	transition: opacity 400ms ease-in-out, transform 400ms ease-in-out;
	transform: translateY(0px);
}

.showUp-enter-from,
.showUp-leave-to {
	opacity: 0;
	transform: translateY(20px);
}
</style>
