<template>
	<div class="error-box" @click="isError = false">
		<span class="error-box__message">{{ message }}</span>
	</div>
</template>

<script setup lang="ts">
import { isError } from '../store';

defineProps({
	message: String
});
</script>
