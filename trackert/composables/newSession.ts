import { calculateDuration } from './calculateDuration'

export function editNewContent(e: PointerEvent, isNew = true, showDot: Ref) {
  const target = e.target as HTMLElement

  if (!target.hasAttribute('contenteditable'))
    return

  if (target.classList.contains('timeEnd'))
    showDot.value = false
  else target.innerText = ''

  if (isNew === true)
    window.scrollTo({ top: 0 })

  const observer = new MutationObserver(() => calculateDuration(e.target as HTMLElement)
  )
  if (target.classList.contains('date') || target.classList.contains('section')) {
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
