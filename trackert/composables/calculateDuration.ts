export function calculateDuration(target: HTMLElement) {
  const timePattern = /^\d{1,2}:\d{1,2}$/ // ex. 13:22
  const timeEndCell: Node = target.classList.contains('timeStart') ? target.nextSibling! : target
  const durationCell: Node = timeEndCell.nextSibling!
  const timeStartCell: Node = timeEndCell.previousSibling!

  console.log('ran')

  setTimeout(() => {
    if (timeEndCell.textContent!.match(timePattern) && timeStartCell.textContent!.match(timePattern)) {
      const now: Date = new Date()
      const yearNow: number = now.getFullYear()
      const monthNow: number = now.getMonth()
      const dayNow: number = now.getDay()

      const timeStart = timeStartCell.textContent!.split(':')
      const timeStartHour: number = Number.parseInt(timeStart[0])
      const timeStartMinutes: number = Number.parseInt(timeStart[1])

      const [timeEndHr, timeEndMin] = timeEndCell.textContent!.split(':')

      const timeEndHour: number = Number.parseInt(timeEndHr)
      const timeEndMinutes: number = Number.parseInt(timeEndMin)

      const date1: any = new Date(yearNow, monthNow, dayNow, timeStartHour, timeStartMinutes, 0, 0)
      const date2: any = new Date(yearNow, monthNow, dayNow, timeEndHour, timeEndMinutes, 0, 0)

      const timeDifference = (date2 - date1) / 1000 / 60

      const differenceHours = Math.floor(timeDifference / 60)
      const differenceMinutes = timeDifference % 60

      durationCell.textContent = differenceHours === 0 ? `${differenceMinutes}m` : `${differenceHours}h ${differenceMinutes}m`
    }
    else durationCell.textContent = 'invalid'
  }, 500)
}
