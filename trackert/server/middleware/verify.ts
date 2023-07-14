export default defineEventHandler((event) => {
  const excluded = ['/auth', '/sessions', '/addsession', '/editsession', '/report']

  if (!event.path.startsWith('/public') && !excluded.includes(event.path)) {
    const { passNumLength, passCharLength } = useRuntimeConfig()
    const token = getCookie(event, 'token')

    if (!token) {
      event.context.auth = false
      return
    }

    let currentChars = 0
    let currentNums = 0

    for (const char of token) {
      if (Number.isNaN(Number.parseInt(char))) {
        currentChars++
        continue
      }

      currentNums++
    }
    event.context.auth = currentChars === passCharLength && currentNums === passNumLength
  }
})
