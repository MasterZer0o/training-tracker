export function getOngoing(): OngoingSession | null {
  try {
    const cookies = document.cookie
    const cookieExists: boolean = cookies.includes('ongoing')
    const { ongoingCookieName } = useRuntimeConfig().public

    if (cookieExists) {
      const cookie = cookies!
        .split(';')
        .find((cookieString: string) => cookieString.includes(`${ongoingCookieName}`))
        .split('=')[1]

      const data = JSON.parse(cookie)

      return data
    }
    else {
      return null
    }
  }
  catch (error) {
    return null
  }
}
