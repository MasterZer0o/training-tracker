import getDb from '../../utils/db'

export default defineEventHandler(async (event) => {
  try {
    const session: Session = await readBody(event)
    const db = await getDb()

    if (('error' in db) || db.data === null)
      throw new Error('Failed to add session.')

    db.data.push(session)

    await db.write()
    sendNoContent(event, 201)
  }
  catch (error) {
    return { error: { message: 'failed to add session' } }
  }
})
