<template>
	<TheHeader />
	<div class="container">
		<Sessions />
		<Error v-if="isError" :message="errorMessage" />
	</div>
</template>

<script setup lang="ts">
import { isError, errorMessage } from './store';
</script>

<style lang="scss">
@use '@/assets/sass/main.scss';
</style>
