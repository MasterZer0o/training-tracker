<script setup lang="ts">
const inputEl = ref<HTMLInputElement>()
const pass = ref('')
const authError = ref<AuthError>({ is: false })

async function handleAuth() {
  if (pass.value.trim() === '')
    return inputEl.value!.focus()

  try {
    const response = await $fetch('/auth', {
      method: 'POST',
      body: {
        pass: pass.value
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
  catch (error) {
    authError.value = {
      is: true,
      status: 'Error'
    }
  }
}
</script>

<template>
  <div class="wrapper">
    <div>
      <p v-if="authError.status" style="text-align: center; color: #bf636d; font-size: 1.3em">
        {{ authError.status }}
      </p>
      <input ref="inputEl" v-model="pass" :style="authError.is && !authError.status ? 'outline:3px solid #b54a55' : undefined" type="password" />

      <button @click="handleAuth">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M5 12l14 0"></path>
          <path d="M15 16l4 -4"></path>
          <path d="M15 8l4 4"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

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
      padding: 0em 3em;
      cursor: pointer;
      transition: transform 100ms ease-in-out;

      svg{
        display: block;
      }

      &:active {
        transform: scale(0.95);
      }
    }
  }
}
</style>
