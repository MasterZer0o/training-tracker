<template>
	<div class="upper">
		<span class="sessions-counter" v-if="sessions.length > 0 && !isLoading">{{ sessions.length }}</span>
		<RefreshButton v-show="!errorCritical && !isLoading" @click="refresh" />
		<Add-Session-button v-if="!isLoading && !errorCritical" />
	</div>
	<Loader v-if="isLoading && isError == false && errorCritical == false" />

	<transition name="showUp">
		<table :style="isLoading || errorCritical ? 'margin-top:2em;' : null">
			<Headers />

			<tbody>
				<tr
					:data-id="session.id"
					:key="session.id"
					v-for="session in sessions"
					:class="['row', session.isNew ? 'new-session' : null]"
					spellcheck="false"
				>
					<Session :key="session.id" :isNew="session.isNew" :session="session" />
				</tr>
			</tbody>
		</table>
	</transition>
	<h2 style="font-weight: bold; color: red; text-align: center" v-if="errorCritical">{{ criticalErrorMessage }}</h2>
</template>

<script setup lang="ts">
import { ref, onMounted, provide } from 'vue';
import { getSessions } from '../composables/getSessions';
import { isLoading, isError, errorMessage } from '../store';
import type { Session } from '../../types';
import { criticalErrorMessage } from '../cfg';
const sessions = ref<Session[]>([]);
const errorCritical = ref<boolean>(false);

defineProps({
	sessions: Array,
	isNew: Boolean
});
async function refresh(e: any) {
	try {
		isError.value = false;
		e.target.classList.toggle('refreshing');
		const data: Session[] = await getSessions();
		sessions.value = data;
		e.target.classList.toggle('refreshing');
	} catch (error) {
		isError.value = true;
		errorMessage.value = 'Failed to refresh data.';
	}
}
onMounted(() => _getSessions());
async function _getSessions() {
	try {
		isLoading.value = true;

		const data: Session[] = await getSessions();

		sessions.value = data;
	} catch (error) {
		errorCritical.value = true;
	}
	isLoading.value = false;
}
provide('sessions', sessions);
</script>
