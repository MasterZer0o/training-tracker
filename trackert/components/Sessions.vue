<script setup lang="ts">
defineProps({
  sessions: Array,
  isNew: Boolean
})

const criticalErrorMessage = useRuntimeConfig().public.criticalErrorMessage

const sessions = ref<Session[]>([])
const errorCritical = ref<boolean>(false)

async function refresh(e: any) {
  try {
    useIsError().value = false
    e.target.classList.toggle('refreshing')
    const data: Session[] = await getSessions()
    sessions.value = data
    e.target.classList.toggle('refreshing')
  }
  catch (error) {
    useIsError().value = true
    useErrorMessage().value = 'Failed to refresh data.'
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
    <RefreshButton v-show="!errorCritical && !useLoading()" @click="refresh" />
    <Add-Session-button v-if="!useLoading() && !errorCritical" />
  </div>
  <Loader v-if="useLoading().value && useIsError().value === false && errorCritical === false" />

  <transition name="showUp">
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
          <Session :key="session.id" :is-new="session.isNew" :session="session" />
        </tr>
      </tbody>
    </table>
  </transition>
  <h2 v-if="errorCritical" style="font-weight: bold; color: red; text-align: center">
    {{ criticalErrorMessage }}
  </h2>
</template>
