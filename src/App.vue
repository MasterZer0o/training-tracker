<template>
	<Header />
	<div class="container">
		<Sessions />
		<Error v-if="is" />
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

let is = ref(false);
setTimeout(() => {
	is.value = true;
}, 1000);
</script>

<style lang="scss">
@import '@/assets/sass/main.scss';
</style>
