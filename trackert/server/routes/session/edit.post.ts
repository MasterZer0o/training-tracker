import getDb from '../../utils/db'

export default defineEventHandler(async (event) => {
  try {
    const session: Session = await readBody(event)
    const db = await getDb()

    if (!('error' in db)) {
      const sessionToUpdate: Session | undefined = db.data?.find(sessionInDB => sessionInDB.id === session.id)
      if (sessionToUpdate !== undefined) {
        sessionToUpdate.section = session.section
        sessionToUpdate.date = session.date
        sessionToUpdate.timeStart = session.timeStart
        sessionToUpdate.timeEnd = session.timeEnd
        sessionToUpdate.duration = session.duration
      }
      await db.write()

      return { success: true }
    }
  }
  catch (error) {
    return {
      error: {
        message: 'failed to edit session'
      }
    }
  }
})
