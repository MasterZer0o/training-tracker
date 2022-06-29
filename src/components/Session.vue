<template>
	<td @click="editNewContent" ref="section" :contenteditable="isNew || editing">{{ session.section }}</td>
	<td @click="editNewContent" ref="date" :contenteditable="isNew || editing">{{ session.date }}</td>
	<td class="timeStart" @click="editNewContent($event)" ref="timeStart" :contenteditable="isNew || editing">
		{{ session.timeStart }}
	</td>
	<td class="timeEnd" @click="editNewContent" ref="timeEnd" :contenteditable="isNew || editing">
		{{ session.timeEnd }}
	</td>
	<td class="duration" ref="duration">{{ session.duration }}</td>
	<td v-if="isNew">
		<img
			v-if="!loader && !hideSubmit"
			@click="submitNewSession"
			class="edit-icon"
			src="../assets/checkbox.svg"
			alt=""
		/>
		<img v-if="hideSubmit && !loader" class="edit-icon" @click="toggleEditing" src="../assets/edit.svg" alt="" />
		<img v-if="editing" @click="updateSession($event)" class="edit-icon" src="../assets/checkbox.svg" alt="" />

		<img v-if="updateError" src="../assets/alert.svg" alt="" />

		<Loader v-if="loader" />
	</td>
	<td v-else>
		<img v-if="!loader && !updateError" class="edit-icon" @click="toggleEditing" src="../assets/edit.svg" alt="" />

		<img v-if="editing" @click="_updateSession" class="edit-icon" src="../assets/checkbox.svg" alt="" />
		<img v-if="updateError" src="../assets/alert.svg" alt="" />
		<Loader v-if="loader" />
	</td>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { editNewContent } from '../composables/newSession';
import { isError } from '../store';
import updateSession from '../composables/updateSession';
import type { Session } from '../composables/session';
const editing = ref(false);
const loader = ref(false);
const hideSubmit = ref(false);
const updateError = ref(false);

const section = ref(null),
	date = ref(null),
	timeStart = ref(null),
	timeEnd = ref(null),
	duration = ref(null);

const data: Session = { section, date, timeStart, timeEnd, duration };
const _updateSession = (e: Event) => updateSession(e, editing, loader, updateError, data);

function toggleEditing(event: Event) {
	event.stopPropagation();
	if (editing.value == false) return (editing.value = true);
	else return (editing.value = false);
}

async function submitNewSession() {
	try {
		hideSubmit.value = true;
		loader.value = true;

		const path = `${location.protocol}//${location.hostname}/main`;
		let session = {
			id: Math.floor(Math.random() * 100000),
			section: section.value.textContent,
			date: date.value.textContent,
			timeStart: timeStart.value.textContent,
			timeEnd: timeEnd.value.textContent,
			duration: duration.value.textContent
		};
		await fetch(path, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(session)
		});
		loader.value = false;
	} catch (error) {
		console.error(error);
		loader.value = false;
		updateError.value = true;
	}
}

defineProps({
	session: Object,
	isNew: Boolean
});
</script>

<style scoped>
.spinner {
	margin: 0;
}
</style>
