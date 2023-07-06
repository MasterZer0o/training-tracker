<script setup lang="ts">
defineProps({
  message: String
})
</script>

<template>
  <div class="error-box" @click="useIsError().value = false">
    <span class="error-box__message">{{ message }}</span>
  </div>
</template>
