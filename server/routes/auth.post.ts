export default defineEventHandler(async (event) => {
  const { pass } = await readBody(event)

  if (pass !== process.env.pass)
    return { success: false }

  const { charsNumIter, passCharLength, passNumLength } = useRuntimeConfig()

  let token = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const digits = '0123456789'

  let currentCharsCount = 0
  let currentNumsCount = 0

  for (let i = 0; i < charsNumIter; i++) {
    const isChar = ((Math.floor(Math.random() * 10) % 2 === 0)
      && currentCharsCount !== passCharLength)
      || currentNumsCount === passNumLength

    if (isChar) {
      token += characters[Math.floor(Math.random() * characters.length)]
      currentCharsCount++
      continue
    }

    token += digits[Math.floor(Math.random() * digits.length)]
    currentNumsCount++
  }

  setCookie(event, 'token', token, { maxAge: 999999999 })
  return { success: true }
})
