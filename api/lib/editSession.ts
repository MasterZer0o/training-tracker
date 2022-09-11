import { Request, Response } from 'express';
import type { Session } from '../../types';
import getDb from './dbClient.js';
export default async function editSession(req: Request, res: Response) {
	try {
		res.header('Access-Control-Allow-Origin', '*');
		const session: Session = req.body;
		const db = await getDb();
		if (!('error' in db)) {
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
		}
	} catch (error) {
		res.json({ error: { message: 'failed to edit session' } });
	}
}
