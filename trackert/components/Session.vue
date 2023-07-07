<script setup lang="ts">
const props = defineProps<{
  session: Session
  isNew: boolean
}>()

const showDot = ref(false)

const showDotInput = (event: Event) =>
  showDot.value = (event.target as HTMLElement).innerText?.length === 0

const editing = ref<undefined | true>()
const loader = ref(false)
const hideSubmit = ref(false)
const updateError = ref(false)
const isNew = ref(false)

const bodyPartEl = ref() as Ref<HTMLElement>
const date = ref() as Ref<HTMLElement>
const timeStart = ref() as Ref<HTMLElement>
const timeEnd = ref() as Ref<HTMLElement>
const duration = ref() as Ref<HTMLElement>
const data: Record<keyof Omit<Session, 'id' | 'isNew'>, Ref<HTMLElement>>
  = { section: bodyPartEl, date, timeStart, timeEnd, duration }

const _updateSession = (e: Event) => updateSession(e, editing, loader, updateError, data)

const unWatchDot = watchEffect(() => {
  showDot.value = timeEnd.value?.innerText.length === 0
  // if (timeEnd.value !== null)
  //   unWatchDot()

  // TODO: ^^^
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
}
const showSectionOptions = ref(false)
const _editNewContent = (e: any) => editNewContent(e, isNew.value, showDot)

function insertSection(event: PointerEvent) {
  showSectionOptions.value = !showSectionOptions.value
  const bodyPartCell = bodyPartEl.value

  bodyPartCell.querySelector('span')!.textContent = (event.target as HTMLElement).dataset.section!
}

const canOpenBodyPartOptions = computed(() => isNew.value)

function triggerSectionOptions() {
  if (editing.value || canOpenBodyPartOptions.value)
    showSectionOptions.value = !showSectionOptions.value
}

function toggleEditing(event: Event) {
  event.stopPropagation()

  if (editing.value === undefined)
    return (editing.value = true)

  if (timeEnd.value.innerText.length === 0) {
    showDot.value = true
  }
  editing.value = undefined
  showSectionOptions.value = false
}
async function submitNewSession(event: Event) {
  const currentRow = (event.target as HTMLElement).closest('tr')!

  try {
    hideSubmit.value = true
    loader.value = true

    const session: Session = {
      id: currentRow.dataset.id,
      section: bodyPartEl.value.querySelector('span')!.textContent!,
      date: date.value.textContent!,
      timeStart: timeStart.value.textContent!,
      timeEnd: timeEnd.value.textContent!,
      duration: duration.value.textContent!
    }

    await $fetch('/session/add', {
      method: 'POST',
      body: session
    })

    const ongoingData: OngoingSession = {
      is: true,
      data: {
        section: bodyPartEl.value.querySelector('span')!.textContent!,
        started: `${timeStart.value.textContent}:${new Date().getSeconds()}`
      }
    }

    timeEnd.value.textContent!.length === 0 && setOngoing(ongoingData)

    loader.value = false
    editing.value = undefined
    isNew.value = false
    currentRow.classList.remove('new-session')
  }
  catch (error) {
    useActionError().value.message = 'Failed to submit new session'
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
  if (props.isNew)
    document.querySelector('table tbody')!
      .insertAdjacentElement('afterbegin', document.querySelector(`[data-id="${props.session.id}"]`)!)
})
</script>

<template>
  <td ref="bodyPartEl" class="section" :class="[editing ? 'editing-session' : null]" @dblclick="triggerSectionOptions">
    <span :contenteditable="isNew || editing" style="display: block; height: 100%; outline: none"> {{ session.section }}</span>
    <transition name="slide">
      <OptionsMenu v-show="showSectionOptions" @click="insertSection" />
    </transition>
  </td>

  <td ref="date" class="date" :contenteditable="isNew || editing" @click="_editNewContent">
    {{ session.date }}
  </td>

  <td ref="timeStart" class="timeStart" :contenteditable="isNew || editing" @click="_editNewContent">
    {{ session.timeStart }}
  </td>

  <td
    ref="timeEnd" class="timeEnd"
    :class="[showDot ? 'dot' : null]"
    :contenteditable="isNew || editing"
    @input="showDotInput"
    @focusout="showDotInput"
    @click="_editNewContent"
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
