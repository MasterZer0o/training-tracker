export async function getSessions(): Promise<Session[]> {
  try {
    const { BASE_URL } = useRuntimeConfig().public

    const path = `${BASE_URL}/sessions`
    const response = await fetch(path)
    const data = await response.json()

    if ('error' in data)
      throw data

    return data.reverse()
  }
  catch (error) {
    return Promise.reject(error)
  }
}
