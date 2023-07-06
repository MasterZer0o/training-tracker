<script setup lang="ts">
const props = defineProps<{
  session: Session
  isNew: boolean
}>()

const BASE_URL = useRuntimeConfig().public.BASE_URL

const showDot = ref(false)
const showDotInput = (event: any) => (event.target?.innerText?.length > 0 ? (showDot.value = false) : (showDot.value = true))
const editing = ref<null | true>(null)
const loader = ref(false)
const hideSubmit = ref(false)
const updateError = ref(false)
const isNew = ref(false)
const section = ref(null)
const date = ref(null)
const timeStart = ref(null)
const timeEnd = ref(null)
const duration = ref(null)
const data: Session = { section, date, timeStart, timeEnd, duration }
const _updateSession = (e: Event) => updateSession(e, editing, loader, updateError, data)

const unWatchDot = watchEffect(() => {
  showDot.value = timeEnd.value?.innerText.length === 0
  if (timeEnd.value !== null)
    unWatchDot()
})

function insertTimeNow(event: any) {
  if (editing.value === true) {
    showDot.value = false
    event.target.textContent = `${new Date().getHours()}:${
      new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()
    }`
    calculateDuration(event.target)
    event.target.blur()
  }
} const showSectionOptions = ref(false)
const _editNewContent = (e: any) => editNewContent(e, isNew.value, showDot)

function insertSection(event: any) {
  showSectionOptions.value = !showSectionOptions.value
  const sectionCell = section.value as HTMLElement

  sectionCell.querySelector('span')!.textContent = event.target.dataset.section
}

const canOpenSectionOptions = computed(() => isNew.value)
function triggerSectionOptions() {
  if (editing.value || canOpenSectionOptions.value)
    showSectionOptions.value = !showSectionOptions.value
}

function toggleEditing(event: Event) {
  event.stopPropagation()
  if (editing.value == null)
    return (editing.value = true)
  else {
    if (timeEnd.value.innerText.length === 0) {
      showDot.value = true
    }
    editing.value = null
    showSectionOptions.value = false
  }
}
async function submitNewSession(event: any) {
  const currentRow = event.target.closest('tr')

  try {
    hideSubmit.value = true
    loader.value = true

    const session: Session = {
      id: currentRow.dataset.id,
      section: section.value.querySelector('span').textContent,
      date: date.value.textContent,
      timeStart: timeStart.value.textContent,
      timeEnd: timeEnd.value.textContent,
      duration: duration.value.textContent
    }

    await fetch(`${BASE_URL}/addsession`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(session)
    })

    const ongoingData: OngoingSession = {
      is: true,
      data: {
        section: section.value.querySelector('span').textContent,
        started: `${timeStart.value.textContent}:${new Date().getSeconds()}`
      }
    }
    setOngoing(ongoingData)

    loader.value = false
    editing.value = null
    isNew.value = false
    currentRow.classList.remove('new-session')
  }
  catch (error) {
    useErrorMessage().value = 'Failed to submit new session'
    useIsError().value = true
    loader.value = false
    updateError.value = true
  }
}

isNew.value = !!props.isNew
onMounted(() => {
  if (props.session.isNew) {
    const [...els]: any = document.querySelectorAll('.new-session td:first-child span')

    const el: HTMLInputElement = els.pop()
    setTimeout(() => el.focus(), 0)
  }

  // ensure new session row comes at the top
  props.isNew
    ? document
      .querySelector('table tbody')
      .insertAdjacentElement('afterbegin', document.querySelector(`[data-id="${props.session.id}"]`))
    : ''
})
</script>

<template>
  <td ref="section" class="section" :class="[editing ? 'editing-session' : null]" @dblclick="triggerSectionOptions">
    <span :contenteditable="isNew || editing" style="display: block; height: 100%; outline: none"> {{ session.section }}</span>
    <transition name="slide">
      <OptionsMenu v-show="showSectionOptions" @click="insertSection" />
    </transition>
  </td>

  <td ref="date" class="date" :contenteditable="isNew || editing" @click="_editNewContent" @focus="_editNewContent">
    {{ session.date }}
  </td>
  <td ref="timeStart" class="timeStart" :contenteditable="isNew || editing" @click="_editNewContent" @focus="_editNewContent">
    {{ session.timeStart }}
  </td>
  <td
    ref="timeEnd" class="timeEnd"
    :class="[showDot ? 'dot' : null]"
    :contenteditable="isNew || editing"
    @input="showDotInput"
    @focusout="showDotInput"
    @click="_editNewContent"
    @focus="_editNewContent"
    @dblclick="insertTimeNow"
  >
    {{ session.timeEnd }}
  </td>
  <td ref="duration" class="duration">
    {{ session.duration }}
  </td>
  <td v-if="isNew">
    <img v-if="!loader && !hideSubmit" class="edit-icon" src="../assets/checkbox.svg" alt="" @click="submitNewSession" />
    <img
      v-if="hideSubmit && !loader && !updateError"
      class="edit-icon"
      src="../assets/edit.svg"
      alt="edit session"
      @click="toggleEditing"
    />
    <img v-if="editing" class="edit-icon" src="../assets/checkbox.svg" alt="" @click="_updateSession" />

    <img v-if="updateError" src="../assets/alert.svg" class="alert-icon" alt="" />

    <Loader v-if="loader" />
  </td>
  <td v-else :class="editing ? 'icons--editing' : null">
    <img v-show="!loader && !updateError" class="edit-icon" src="../assets/edit.svg" alt="" @click="toggleEditing" />

    <img v-if="editing" class="edit-icon" src="../assets/checkbox.svg" alt="update session" @click="_updateSession" />
    <img v-if="updateError" src="../assets/alert.svg" class="alert-icon" alt="" />
    <Loader v-if="loader" />
  </td>
</template>
../composables/setOngoing
