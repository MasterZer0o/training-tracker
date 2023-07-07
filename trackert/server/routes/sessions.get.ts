import getDb from '../utils/db'

export default defineEventHandler(async () => {
  try {
    const db = await getDb()
    if ('error' in db || db.data === null)
      throw new Error('Err')

    // await new Promise(res => setTimeout(res, 2000))

    return db.data
  }
  catch (error) {
    return { error: { message: 'failed to pull sessions' } }
  }
})
