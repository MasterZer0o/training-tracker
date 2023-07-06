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
    const isChar = ((Math.floor(Math.random() * 10) % 2 === 0) && currentCharsCount !== passCharLength) || currentNumsCount === passNumLength
    // TODO: it works - cleanup

    if (isChar) {
      token += characters[Math.floor(Math.random() * characters.length)]
      currentCharsCount++
      continue
    }

    token += digits[Math.floor(Math.random() * digits.length)]
    currentNumsCount++
    // else {
    //   token += digits[Math.floor(Math.random() * digits.length)]
    // }

    // if ((!isChar && currentNumsCount !== passNumLength) || (isChar && currentCharsCount === passCharLength)) {
    //   token += digits[Math.floor(Math.random() * digits.length)]
    //   currentNumsCount++
    //   continue
    // }

    // token += isChar
    //   ? characters[Math.floor(Math.random() * characters.length)]
    //   : digits[Math.floor(Math.random() * digits.length)]

    // isChar ? currentCharsCount++ : currentNumsCount++
  }
  console.log(currentCharsCount, currentNumsCount)

  setCookie(event, 'token', token)
  return { success: true }
})
