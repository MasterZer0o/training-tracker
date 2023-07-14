export default defineEventHandler((event) => {
  const { passNumLength, passCharLength } = useRuntimeConfig()
  const token = getCookie(event, 'token')

  if (!token) {
    return { success: false }
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
  return {
    success: currentChars === passCharLength && currentNums === passNumLength
  }
})
