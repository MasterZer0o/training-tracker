<script setup lang="ts">
if (process.client) {
  const ongoing = getOngoing()

  if (ongoing !== null) {
    useOngoingSession().value = {
      is: ongoing.is,
      data: ongoing.data
    }
  }
  else resetOngoing()
}
</script>

<template>
  <ClientOnly>
    <transition name="ongoing" appear>
      <OngoingSession v-if="useOngoingSession().value.is" :data="useOngoingSession().value.data" />
    </transition>
  </ClientOnly>

  <TheHeader />

  <transition name="showUp" appear>
    <div class="container">
      <Sessions />
      <Error v-if="useIsError().value" :message="useErrorMessage().value" />
    </div>
  </transition>
</template>
