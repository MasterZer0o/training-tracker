<template>
	<div class="wrapper">
		<div>
			<p v-if="authError.status" style="text-align: center; color: red; font-size: 1.3em">{{ authError.status }}</p>
			<input
				:style="authError.is && !authError.status ? 'outline:3px solid #BF616A' : null"
				ref="input"
				v-model="pass"
				type="password"
				data-security-input
			/>
			<button @click="passAuth">&rarr;</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const input = ref(null);
const pass = ref('');

function passAuth() {
	if (pass.value === '') return input.value.focus();
	emit('requestAuth', pass.value);
}
defineProps<{
	authError: {
		is: boolean;
		status?: string;
	};
}>();
const emit = defineEmits(['requestAuth']);
</script>

<style lang="scss">
.wrapper {
	position: absolute;
	inset: 0;
	background-color: #2e3440;
	z-index: 1000;
	display: grid;
	place-items: center;
	div {
		input {
			color: var(--text);
			text-align: center;
			font-size: 1.3em;
			border-radius: 4px;
			background-color: hsl(220, 16%, 35%);
			border: none;
			padding: 0.5em;
			outline: 0px solid black;
			transition: outline 250ms ease-in-out;
			&:focus {
				outline: 3px solid hsl(220, 16%, 40%);
			}
		}
		button {
			background-color: hsl(220, 16%, 60%);
			color: white;
			border-radius: 4px;
			border: none;
			margin: 10px auto 0 auto;
			display: block;
			padding: 0em 1em;
			font-size: 2em;
			cursor: pointer;
			transition: transform 100ms ease-in-out;
			&:active {
				transform: scale(0.95);
			}
		}
	}
}
</style>
