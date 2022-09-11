import { Request, Response } from 'express';
import type { Session } from '../../types';
import getDb from './dbClient.js';

export default async function addSession(req: Request, res: Response) {
	try {
		res.header('Access-Control-Allow-Origin', '*');

		const session: Session = req.body;
		const db = await getDb();

		if (!('error' in db) && db.data !== null) {
			db.data.push(session);
			await db.write();
			res.json('success');
		} else throw 'Failed to add session.';
	} catch (error) {
		res.json({ error: { message: 'failed to add session' } });
	}
}
