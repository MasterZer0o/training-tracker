<script setup lang="ts">
const netStatus = useNetStatus()
const currentStatus = ref(netStatus.value)

let timeout: ReturnType<typeof setTimeout>

function setOnline() {
  currentStatus.value = 'online'
  timeout = setTimeout(() => (netStatus.value = 'online'), 2500)
}

window.addEventListener('online', setOnline)
onUnmounted(() => {
  removeEventListener('online', setOnline)
  clearTimeout(timeout)
})
</script>

<template>
  <div class="net-bar" :data-status="currentStatus">
    <span>You are <strong>{{ currentStatus }}</strong></span>
  </div>
</template>
