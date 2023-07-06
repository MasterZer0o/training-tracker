<script setup lang="ts">
</script>

<template>
  <transition name="ongoing" appear>
    <OngoingSession v-if="useOngoingSession().value.is" :data="useOngoingSession().value.data" />
  </transition>

  <TheHeader />

  <transition name="showUp" appear>
    <div class="container">
      <Sessions />
      <Error v-if="useIsError().value" :message="useErrorMessage().value" />
    </div>
  </transition>
</template>
