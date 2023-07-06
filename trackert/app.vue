<script setup lang="ts">
const { BASE_URL } = useRuntimeConfig().public

const securityCheckPassed = ref<boolean>(false)
const initialCheck = ref(true)

// dynamic components. Get imported only when authenticated.
const authError = ref<AuthError>({ is: false })

onBeforeMount(async () => {
  window.addEventListener('offline', () => (useNetStatus().value = 'offline'))

  const code = localStorage.getItem('pass')
  if (code)
    securityCheckPassed.value = true
  else initialCheck.value = false

  if (securityCheckPassed.value === true) {
    const ongoing = getOngoing()
    if (ongoing !== null) {
      useOngoingSession().value = {
        is: ongoing.is,
        data: ongoing.data
      }
    }
    else resetOngoing()
  }
})
// process.client && $fetch('/auth', {
//   method: 'post',
//   body: {
//     pass: '123'
//   }
// })

if (process.server) {
  const event = useRequestEvent()
  useState('auth', () => !!event.context.auth)
}
// console.log(useState('auth').value)

async function handleAuth(pass: string) {
  try {
    if (pass !== '') {
      const response = await $fetch('/auth', {
        method: 'POST',
        body: {
          pass
        }
      })
      // if (response.success)
      //   useState('auth').value = true

      // if (response === 'passed') {
      //   securityCheckPassed.value = true
      //   localStorage.setItem('pass', Math.random().toString(36).slice(2))
      // }
      // else {
      //   authError.value = {
      //     is: true
      //   }
      // }
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

  <!-- <ClientOnly> -->
  <!-- <LazySecurity v-if="!securityCheckPassed && !initialCheck" :auth-error="authError" @requestAuth="handleAuth" /> -->
  <LazySecurity v-if="!useState('auth').value" :auth-error="authError" @requestAuth="handleAuth" />
  <LazyMain v-else />
  <!-- </ClientOnly> -->
</template>
