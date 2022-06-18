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
		<Loader v-if="loader" />
	</td>
	<td v-else>
		<img v-if="!loader" class="edit-icon" @click="toggleEditing" src="../assets/edit.svg" alt="" />

		<img v-if="editing" @click="updateSession($event)" class="edit-icon" src="../assets/checkbox.svg" alt="" />
		<Loader v-if="loader" />
	</td>
</template>

<script setup>
import { ref } from 'vue';
import { editNewContent } from '../composables/newSession';
import { isError } from '../store';
const editing = ref(null);
const loader = ref(false);
const hideSubmit = ref(false);

function toggleEditing(e) {
	e.stopPropagation();
	if (editing.value == null) return (editing.value = true);
	else return (editing.value = null);
}

async function submitNewSession() {
	try {
		hideSubmit.value = true;
		loader.value = true;
		const { section, date, timeStart, timeEnd, duration } = this.$refs;
		const path = `${location.protocol}//${location.hostname}/main`;
		let session = {
			id: Math.floor(Math.random() * 100000),
			section: section.textContent,
			date: date.textContent,
			timeStart: timeStart.textContent,
			timeEnd: timeEnd.textContent,
			duration: duration.textContent
		};
		await fetch(path, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(session)
		});
		loader.value = false;
	} catch (error) {
		this.$emit('isError', true);
	}
}
async function updateSession(e) {
	try {
		editing.value = null;
		loader.value = true;
		let path = `${window.location.protocol}//${window.location.hostname}/editfile`;
		let id = e.target.parentElement.parentElement.dataset.id;
		const { section, date, timeStart, timeEnd, duration } = this.$refs;

		let session = {
			id,
			section: section.textContent,
			date: date.textContent,
			timeStart: timeStart.textContent,
			timeEnd: timeEnd.textContent,
			duration: duration.textContent
		};
		await fetch(path, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(session)
		});
		loader.value = false;
	} catch (error) {
		this.$emit('isError', true);
	}
}
defineEmits(['isError']);
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
