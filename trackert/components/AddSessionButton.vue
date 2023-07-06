<script setup lang="ts">
const sessions = inject<Session[]>('sessions')
const _ = () => addPlaceholder(sessions as any)
</script>

<template>
  <button class="btn" @click="_">
    +
  </button>
</template>
