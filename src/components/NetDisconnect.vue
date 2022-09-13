<template>
	<div class="net-bar" :data-status="status">
		<span
			>You are <strong>{{ status }}</strong></span
		>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onUnmounted } from 'vue';
import { netStatus } from '../store';
const status = ref('offline');
let timeout: any = null;
const setOnline = () => {
	status.value = 'online';
	timeout = setTimeout(() => (netStatus.value = 'online'), 2500);
};

window.addEventListener('online', setOnline);
onUnmounted(() => {
	try {
		removeEventListener('online', setOnline);
		clearTimeout(timeout);
	} catch (error) {}
});
</script>
