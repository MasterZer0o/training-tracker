<script setup lang="ts">
const authError = ref<AuthError>({ is: false })

onBeforeMount(() => window.addEventListener('offline', () => (useNetStatus().value = 'offline')))

if (process.server) {
  const event = useRequestEvent()
  useState('auth', () => !!event.context.auth)
}

async function handleAuth(pass: string) {
  try {
    if (pass !== '') {
      const response = await $fetch('/auth', {
        method: 'POST',
        body: {
          pass
        }
      })

      if (response.success)
        useState('auth').value = true

      else {
        authError.value = {
          is: true
        }
      }
    }
  }
  catch (error) {
    authError.value = {
      is: true,
      status: 'Error occurred'
    }
  }
}
if (process.client) {
  if ('scrollRestoration' in history)
    history.scrollRestoration = 'manual'

  // if ('serviceWorker' in navigator)
  //   navigator.serviceWorker.register('/sw.js')
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

  <LazySecurity v-if="!useState('auth').value" :auth-error="authError" @requestAuth="handleAuth" />
  <LazyMain v-else />
</template>
