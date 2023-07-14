import { JSONFile, Low } from 'lowdb'

export default async function getDb() {
  try {
    const adapter = new JSONFile<Session[]>('data/sessions.json')
    const db = new Low(adapter)
    await db.read()
    db.data ||= []
    return db
  }
  catch (error) {
    return {
      error: 'Failed to get db.'
    }
  }
}
