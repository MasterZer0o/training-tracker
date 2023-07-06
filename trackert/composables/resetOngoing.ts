export function resetOngoing() {
  const { ongoingCookieName } = useRuntimeConfig().public

  // session ended - reset values..
  useOngoingSession().value = {
    is: false,
    data: {
      section: '',
      started: ''
    }
  }
  // remove cookie.
  document.cookie = `${ongoingCookieName}=;max-age=0;`
}
