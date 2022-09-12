<template>
	<td :class="['section', editing ? 'editing-session' : null]" @dblclick="triggerSectionOptions" ref="section">
		<span :contenteditable="isNew || editing" style="display: block; height: 100%; outline: none"> {{ session.section }}</span>
		<transition name="slide">
			<OptionsMenu @click="insertSection" v-show="showSectionOptions" />
		</transition>
	</td>

	<td class="date" @click="_editNewContent" @focus="_editNewContent" ref="date" :contenteditable="isNew || editing">
		{{ session.date }}
	</td>
	<td class="timeStart" @click="_editNewContent" @focus="_editNewContent" ref="timeStart" :contenteditable="isNew || editing">
		{{ session.timeStart }}
	</td>
	<td
		@input="showDotInput"
		@focusout="showDotInput"
		:class="['timeEnd', showDot ? 'dot' : null]"
		@click="_editNewContent"
		@focus="_editNewContent"
		ref="timeEnd"
		:contenteditable="isNew || editing"
		@dblclick="insertTimeNow"
	>
		{{ session.timeEnd }}
	</td>
	<td class="duration" ref="duration">{{ session.duration }}</td>
	<td v-if="isNew">
		<img v-if="!loader && !hideSubmit" @click="submitNewSession" class="edit-icon" src="../assets/checkbox.svg" alt="" />
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
	<td v-else :class="editing ? 'icons--editing' : null">
		<img v-show="!loader && !updateError" class="edit-icon" @click="toggleEditing" src="../assets/edit.svg" alt="" />

		<img v-if="editing" @click="_updateSession" class="edit-icon" src="../assets/checkbox.svg" alt="update session" />
		<img v-if="updateError" src="../assets/alert.svg" class="alert-icon" alt="" />
		<Loader v-if="loader" />
	</td>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';
import { editNewContent } from '../composables/newSession';
import updateSession from '../composables/updateSession';
import type { OngoingSession, Session } from '../../types';
import { isError, errorMessage } from '../store';
import { BASE_URL } from '../cfg';
import calculateDuration from '../composables/calculateDuration';
import { computed } from '@vue/reactivity';
import setOngoing from '../composables/ongoing/setOngoing';
const showDot = ref(false);
const props = defineProps<{
	session: Session;
	isNew: Boolean;
}>();
const showDotInput = (event: any) => (event.target?.innerText?.length > 0 ? (showDot.value = false) : (showDot.value = true));
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

const unWatchDot = watchEffect(() => {
	showDot.value = timeEnd.value?.innerText.length === 0 ? true : false;
	if (timeEnd.value !== null) unWatchDot();
});

function insertTimeNow(event: any) {
	if (editing.value === true) {
		showDot.value = false;
		event.target.textContent = `${new Date().getHours()}:${
			new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
		}`;
		calculateDuration(event.target);
		event.target.blur();
	}
}
const _editNewContent = (e: any) => editNewContent(e, isNew.value, showDot);
function insertSection(event: any) {
	showSectionOptions.value = !showSectionOptions.value;
	const sectionCell = section.value as HTMLElement;

	sectionCell.querySelector('span').textContent = event.target.dataset.section;
}

const showSectionOptions = ref(false);
const canOpenSectionOptions = computed(() => isNew.value);
function triggerSectionOptions() {
	if (editing.value || canOpenSectionOptions.value) showSectionOptions.value = !showSectionOptions.value;
}

function toggleEditing(event: Event) {
	event.stopPropagation();
	if (editing.value == null) return (editing.value = true);
	else {
		if (timeEnd.value.innerText.length === 0) {
			showDot.value = true;
		}
		editing.value = null;
		showSectionOptions.value = false;
	}
}
async function submitNewSession(event: any) {
	const currentRow = event.target.closest('tr');

	try {
		hideSubmit.value = true;
		loader.value = true;

		const session: Session = {
			id: currentRow.dataset.id,
			section: section.value.querySelector('span').textContent,
			date: date.value.textContent,
			timeStart: timeStart.value.textContent,
			timeEnd: timeEnd.value.textContent,
			duration: duration.value.textContent
		};

		await fetch(`${BASE_URL}/addsession`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(session)
		});

		const ongoingData: OngoingSession = {
			is: true,
			data: {
				section: section.value.querySelector('span').textContent,
				started: `${timeStart.value.textContent}:${new Date().getSeconds()}`
			}
		};
		setOngoing(ongoingData);

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

isNew.value = props.isNew ? true : false;
onMounted(() => {
	if (props.session.isNew) {
		const [...els]: any = document.querySelectorAll('.new-session td:first-child span');

		const el: HTMLInputElement = els.pop();
		setTimeout(() => el.focus(), 0);
	}

	// ensure new session row comes at the top
	props.isNew
		? document
				.querySelector('table tbody')
				.insertAdjacentElement('afterbegin', document.querySelector(`[data-id="${props.session.id}"]`))
		: '';
});
</script>
