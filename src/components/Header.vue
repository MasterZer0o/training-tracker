<template>
	<header>
		<h1>Training Tracker</h1>
	</header>
</template>

<script setup>
import { ref } from 'vue';

function add() {
	const newSession = {
		id: 2,
		section: 'klata',
		date: new Date().toLocaleDateString('pl'),
		timeStart: '12:00',
		timeEnd: '14:00',
		duration: '2 godziny'
	};

	this.$emit('add-click', newSession);
}
</script>

<style></style>
