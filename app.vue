<script setup lang="ts">
const isLoading = ref<boolean>(true)

onBeforeMount(() => window.addEventListener('offline', () => (useNetStatus().value = 'offline')))

if (process.client) {
  if ('scrollRestoration' in history)
    history.scrollRestoration = 'manual'

  const response = await $fetch<{ success: boolean }>('/auth')

  useState('auth', () => response.success)
  isLoading.value = false

  if ('serviceWorker' in navigator)
    navigator.serviceWorker.register('/sw.js')
}
const showCloseButton = process.client && !!window.matchMedia('(display-mode: standalone)').matches

const closeAppPWA = () => window?.close()
</script>

<template>
  <button v-if="showCloseButton" class="close-app" @click="closeAppPWA">
    &#10006;
  </button>
  <transition name="net" appear>
    <NetDisconnect v-if="useNetStatus().value === 'offline'" />
  </transition>

  <ClientOnly>
    <Loader v-if="isLoading" style="position: relative;z-index: 99999;margin-top: 40vh;" />
    <LazySecurity v-if="useState('auth').value === false && !isLoading" />
    <LazyMain v-if="useState('auth').value === true && !isLoading" />
  </ClientOnly>
</template>
