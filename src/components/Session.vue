<template>
	<td
		autofocus
		class="section"
		@click="editNewContent"
		@focus="editNewContent"
		ref="section"
		:contenteditable="isNew || editing"
	>
		{{ session.section }}
	</td>

	<td class="date" @click="editNewContent" @focus="editNewContent" ref="date" :contenteditable="isNew || editing">
		{{ session.date }}
	</td>
	<td
		class="timeStart"
		@click="editNewContent"
		@focus="editNewContent"
		ref="timeStart"
		:contenteditable="isNew || editing"
	>
		{{ session.timeStart }}
	</td>
	<td
		class="timeEnd"
		@click="editNewContent"
		@focus="editNewContent"
		ref="timeEnd"
		:contenteditable="isNew || editing"
		@dblclick="insertTimeNow"
	>
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
		<img
			v-if="hideSubmit && !loader && !updateError"
			class="edit-icon"
			@click="toggleEditing"
			src="../assets/edit.svg"
			alt="edit session"
		/>
		<img v-if="editing" @click="_updateSession" class="edit-icon" src="../assets/checkbox.svg" alt="" />

		<img v-if="updateError" src="../assets/alert.svg" class="alert-icon" alt="" />

		<Loader v-if="loader" />
	</td>
	<td v-else>
		<img v-show="!loader && !updateError" class="edit-icon" @click="toggleEditing" src="../assets/edit.svg" alt="" />

		<img v-if="editing" @click="_updateSession" class="edit-icon" src="../assets/checkbox.svg" alt="" />
		<img v-if="updateError" src="../assets/alert.svg" class="alert-icon" alt="" />
		<Loader v-if="loader" />
	</td>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { editNewContent } from '../composables/newSession';
import updateSession from '../composables/updateSession';
import type { Session } from '../composables/session';
import { isError, errorMessage } from '../store';
import { BASE_URL } from '../cfg';
import calculateDuration from '../composables/calculateDuration';

const editing = ref<null | true>(null);
const loader = ref(false);
const hideSubmit = ref(false);
const updateError = ref(false);
const isNew = ref(false);
const section = ref(null),
	date = ref(null),
	timeStart = ref(null),
	timeEnd = ref(null),
	duration = ref(null);
const data: Session = { section, date, timeStart, timeEnd, duration };
const _updateSession = (e: Event) => updateSession(e, editing, loader, updateError, data);

function insertTimeNow(e: any) {
	if (editing.value == true) {
		e.target.textContent = `${new Date().getHours()}:${
			new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
		}`;
		calculateDuration(e.target);
	}
}

function toggleEditing(event: Event) {
	event.stopPropagation();
	if (editing.value == null) return (editing.value = true);
	else return (editing.value = null);
}
async function submitNewSession(e: any) {
	const currentRow = e.target.closest('tr');

	try {
		hideSubmit.value = true;
		loader.value = true;

		const path = `${BASE_URL}/addsession`;
		const session = {
			id: currentRow.dataset.id,
			section: section.value.textContent,
			date: date.value.textContent,
			timeStart: timeStart.value.textContent,
			timeEnd: timeEnd.value.textContent,
			duration: duration.value.textContent
		};

		await fetch(path, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(session)
		});
		loader.value = false;
		editing.value = null;
		isNew.value = false;
		currentRow.classList.remove('new-session');
	} catch (error) {
		errorMessage.value = 'Failed to submit new session';
		isError.value = true;
		loader.value = false;
		updateError.value = true;
	}
}
const props = defineProps<{
	session: Session;
	isNew: Boolean;
}>();
isNew.value = props.isNew ? true : false;
onMounted(() => {
	props.session.isNew ? section.value.focus() : null;

	// ensure new session row comes at the top
	props.isNew
		? document
				.querySelector('table tbody')
				.insertAdjacentElement('afterbegin', document.querySelector(`[data-id="${props.session.id}"]`))
		: '';
});
</script>

<style scoped>
.spinner {
	margin: 0;
}
</style>
