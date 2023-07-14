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
      <OngoingSession v-if="useOngoingSession().value.is" />
    </transition>
  </ClientOnly>

  <header>
    <h1>Training Tracker</h1>
  </header>

  <div class="container">
    <Sessions />
    <Error v-if="useActionError().value.message !== null" />
  </div>
</template>
