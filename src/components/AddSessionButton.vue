<template>
	<button @click="_" class="btn">+</button>
</template>

<script setup lang="ts">
import { inject, Ref } from 'vue';
import { addPlaceholder } from '../composables/newSession';

const _ = () => addPlaceholder(sessions);
const sessions: Ref = inject('sessions');
</script>
