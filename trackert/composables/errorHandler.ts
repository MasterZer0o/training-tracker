export default async function errorHandler(error: any, instance: ComponentPublicInstance | null, info: string) {
  try {
    const { BASE_URL } = useRuntimeConfig().public

    await fetch(`${BASE_URL}/report`, {
      method: 'POST',
      body: JSON.stringify({ error: error.stack || error, instance, info }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  catch (error) {}
}
