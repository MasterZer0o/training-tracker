<template>
	<h2 style="font-weight: bold; color: red; text-align: center" v-if="isError">Error occured</h2>
	<span class="sessions-counter" v-if="!isError">{{ sessions.length }}</span>
	<Add-Session-button />
	<table>
		<thead>
			<tr class="headers-row">
				<th>Partia</th>
				<th>data</th>
				<th>od</th>
				<th>do</th>
				<th>czas trwania</th>
				<th></th>
			</tr>
		</thead>

		<tbody>
			<tr :data-id="session.id" :key="session.id" v-for="session in sessions" class="row">
				<Session :isNew="session.isNew" :session="session" />
			</tr>
		</tbody>
	</table>

	<Loader v-if="isLoading && isError == false" />
</template>

<script setup lang="ts">
import { ref, onMounted, provide } from 'vue';
import { getSessions } from '../composables/session';
import { isLoading } from '../store';
import type { Session } from '../composables/session';
const sessions = ref([]);
defineProps({
	sessions: Array,
	isNew: Boolean
});
onMounted(async () => {
	try {
		isLoading.value = true;
		const data: Session[] = await getSessions();

		sessions.value = data;
		isLoading.value = false;
	} catch (error) {
		isError.value = true;
	}
});
provide('sessions', sessions);
const isError = ref(false);
</script>
