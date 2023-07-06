export async function updateSession(e: any, editing: Ref, loader: Ref, updateError: Ref, data: Session) {
  try {
    editing.value = null
    loader.value = true
    const id = e.target.parentElement.parentElement.dataset.id
    const { section, date, timeStart, timeEnd, duration }: any = data

    const session: Session = {
      id,
      section: section.value.querySelector('span').textContent,
      date: date.value.textContent,
      timeStart: timeStart.value.textContent,
      timeEnd: timeEnd.value.textContent,
      duration: duration.value.textContent
    }
    const { BASE_URL } = useRuntimeConfig().public

    const response = await (
      await fetch(`${BASE_URL}/editsession`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(session)
      })
    ).json()

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
            section: section.value.querySelector('span').textContent,
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
