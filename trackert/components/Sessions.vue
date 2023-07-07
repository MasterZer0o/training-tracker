<script setup lang="ts">
const sessions = ref<Session[]>([])
const errorCritical = ref<boolean>(false)

async function refresh(e: any) {
  try {
    useActionError().value.message = null
    e.target.classList.toggle('refreshing')
    const data: Session[] = await getSessions()
    sessions.value = data
    e.target.classList.toggle('refreshing')
  }
  catch (error) {
    useActionError().value.message = 'Failed to refresh data.'
  }
}
onMounted(() => _getSessions())
async function _getSessions() {
  try {
    useLoading().value = true

    const data: Session[] = await getSessions()

    sessions.value = data
  }
  catch (error) {
    errorCritical.value = true
  }
  useLoading().value = false
}
provide('sessions', sessions)
</script>

<template>
  <div class="upper">
    <span v-if="sessions.length > 0 && !useLoading().value" class="sessions-counter">{{ sessions.length }}</span>
    <RefreshButton v-show="!errorCritical && !useLoading().value" @click="refresh" />
    <AddSessionButton v-if="!useLoading().value && !errorCritical" />
  </div>
  <Loader v-if="useLoading().value && useActionError().value.message === null && errorCritical === false" />

  <ClientOnly v-if="!useLoading().value">
    <transition name="showUp" appear>
      <table :style="useLoading().value || errorCritical ? 'margin-top:2em;' : undefined">
        <Headers />

        <tbody>
          <tr
            v-for="session in sessions"
            :key="session.id"
            :data-id="session.id"
            class="row" :class="[session.isNew ? 'new-session' : null]"
            spellcheck="false"
          >
            <Session :key="session.id" :is-new="session.isNew || false" :session="session" />
          </tr>
        </tbody>
      </table>
    </transition>
  </ClientOnly>
  <h2 v-if="errorCritical" style="font-weight: bold; color: red; text-align: center">
    Something went wrong
  </h2>
</template>
