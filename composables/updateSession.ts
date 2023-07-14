export async function updateSession(event: any, editing: Ref, loader: Ref, updateError: Ref, data: Record<keyof Omit<Session, 'id' | 'isNew'>, Ref<HTMLElement>>) {
  try {
    editing.value = null
    loader.value = true
    const id = event.target.parentElement.parentElement.dataset.id
    const { section, date, timeStart, timeEnd, duration } = data

    const session: Session = {
      id,
      section: section.value.querySelector('span')!.textContent!,
      date: date.value.textContent!,
      timeStart: timeStart.value.textContent!,
      timeEnd: timeEnd.value.textContent!,
      duration: duration.value.textContent!
    }

    const response = await $fetch('/session/edit', {
      method: 'POST',
      body: session
    })

    if ('error' in response)
      throw response

    // session ended - reset.
    if (session.timeEnd.length > 0)
      resetOngoing()
    else {
      const ongoing = getOngoing()
      if (ongoing !== null) {
        const ongoingData: OngoingSession = {
          is: true,
          data: {
            section: section.value.querySelector('span')!.textContent!,
            started: ongoing.data.started
          }
        }
        setOngoing(ongoingData)
      }
    }

    loader.value = false
    useState<MutationObserver>('observer').value?.disconnect()
  }
  catch (error: any) {
    loader.value = false

    updateError.value = true
    useActionError().value.message = 'Failed to edit session'
  }
}
