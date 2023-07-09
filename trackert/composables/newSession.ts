export function editNewContent(e: PointerEvent, isNew = true, showDot: Ref<boolean>) {
  const target = e.target as HTMLElement

  useState<MutationObserver>('observer').value?.disconnect()

  if (!target.hasAttribute('contenteditable'))
    return

  if (target.classList.contains('timeEnd'))
    showDot.value = false
  else target.innerText = ''

  if (isNew === true)
    window.scrollTo({ top: 0 })

  const observer = new MutationObserver(() => calculateDuration(target))

  useState<MutationObserver>('observer').value = observer

  if (Array.from(target.classList).some(className => ['timeStart', 'timeEnd'].includes(className))) {
    observer.observe(target, { characterData: true, subtree: true })
  }
}

export function addPlaceholder(sessions: Ref<Session[]>): void {
  const sessionPlaceholder: Session = {
    id: Date.now(),
    section: '',
    date: new Date().toLocaleDateString('pl'),
    timeStart: `${new Date().getHours()}:${
      new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()
    }`,
    timeEnd: '',
    duration: '',
    isNew: true
  }

  sessions.value.push(sessionPlaceholder)
}
