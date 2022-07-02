import { Request, Response } from 'express';
import type Session from '../Session';
import { fileURLToPath } from 'url';
import { Low, JSONFile } from 'lowdb';
import { join, dirname } from 'path';
export default async function editSession(req: Request, res: Response) {
	try {
		res.header('Access-Control-Allow-Origin', '*');
		const session: Session = req.body;

		const __dirname = dirname(fileURLToPath(import.meta.url));

		const file = join(__dirname, '../sessions.json');
		const adapter = new JSONFile<Session[]>(file);
		const db = new Low(adapter);
		await db.read();
		const sessionToUpdate: Session | undefined = db.data?.find(sessionInDB => sessionInDB.id == session.id);

		if (sessionToUpdate !== undefined) {
			sessionToUpdate.section = session.section;
			sessionToUpdate.date = session.date;
			sessionToUpdate.timeStart = session.timeStart;
			sessionToUpdate.timeEnd = session.timeEnd;
			sessionToUpdate.duration = session.duration;
		}
		await db.write();
		res.json({ message: 'success' });
	} catch (error) {
		res.json({ error: { message: 'failed to edit session' } });
	}
}
