<script setup lang="ts">
const { data } = useOngoingSession().value

// split for started: hour, minutes, seconds.
const started = data.started.split(':')

const startedHour = Number.parseInt(started[0])
const startedMinutes = Number.parseInt(started[1])
const startedSeconds = Number.parseInt(started[2])

const now = new Date()
const minutesNow = now.getMinutes()
const hourNow = now.getHours()
const secondsNow = now.getSeconds()

// calculate time difference between time the Session was added and now (in seconds).
const timeDifferenceSeconds
  = hourNow * 3600 + minutesNow * 60 + secondsNow - (startedHour * 3600 + startedMinutes * 60 + startedSeconds)

const passedHours = Math.floor(timeDifferenceSeconds / 3600)
const passedMinutes = Math.floor(timeDifferenceSeconds / 60) - passedHours * 60
const passedSeconds = timeDifferenceSeconds - (passedHours * 3600 + passedMinutes * 60)

const durationSeconds = ref(passedSeconds)
const durationMinutes = ref(passedMinutes)
const durationHours = ref(passedHours)

function updateTime() {
  durationSeconds.value += 1
  if (durationSeconds.value >= 60) {
    durationMinutes.value += 1
    durationSeconds.value = 0
  }

  if (durationMinutes.value >= 60) {
    durationMinutes.value = 0
    durationHours.value += 1
  }
}

const timerUpdate = setInterval(() => updateTime(), 1000)
onUnmounted(() => clearInterval(timerUpdate))
</script>

<template>
  <div class="ongoing-bar">
    <span>
      <strong>{{ useOngoingSession().value.data.section }}</strong></span>
    <span>
      <strong>
        {{ durationHours || null }}
        {{ durationHours === 0 ? null : ':' }}
        {{ durationMinutes <= 9 && durationHours > 0 ? '0' : null
        }}{{ durationMinutes || durationHours > 0 ? durationMinutes : null }}
        {{ durationMinutes > 0 || durationHours > 0 ? ':' : null }}
        {{ durationSeconds <= 9 ? '0' : null }}{{ durationSeconds }}
      </strong>
    </span>
  </div>
</template>
