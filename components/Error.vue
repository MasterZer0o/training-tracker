<script setup lang="ts">
defineProps({
  message: String
})

const error = useActionError()
</script>

<template>
  <div class="error-box" @click="error.message = null">
    <span class="error-box__message">{{ error.message }}</span>
  </div>
</template>
