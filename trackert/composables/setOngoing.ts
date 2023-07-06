export function setOngoing(ongoingData: OngoingSession) {
  const { ongoingCookieName } = useRuntimeConfig().public

  document.cookie = `${ongoingCookieName}=${JSON.stringify(ongoingData)};max-age=2590000`
  useOngoingSession().value = ongoingData
}
