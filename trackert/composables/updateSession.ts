export async function updateSession(e: any, editing: Ref, loader: Ref, updateError: Ref, data: Record<keyof Omit<Session, 'id' | 'isNew'>, Ref<HTMLElement>>) {
  try {
    editing.value = null
    loader.value = true
    const id = e.target.parentElement.parentElement.dataset.id
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
  }
  catch (error: any) {
    console.error(error)

    loader.value = false
    useIsError().value = true
    useErrorMessage().value = 'failed to edit session'
    updateError.value = true
  }
}
