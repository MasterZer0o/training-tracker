export async function getSessions(): Promise<Session[]> {
  try {
    const data = await $fetch('/sessions')

    if ('error' in data)
      throw data

    return data.reverse()
  }
  catch (error) {
    return Promise.reject(error)
  }
}
