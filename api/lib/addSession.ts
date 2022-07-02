import { fileURLToPath } from 'url';
import { Low, JSONFile } from 'lowdb';
import { join, dirname } from 'path';
import { Request, Response } from 'express';
import type Session from '../Session';

export default async function addSession(req: Request, res: Response) {
	try {
		res.header('Access-Control-Allow-Origin', '*');

		const session: Session = req.body;

		const __dirname = dirname(fileURLToPath(import.meta.url));

		const file = join(__dirname, '../sessions.json');
		const adapter = new JSONFile<any>(file);
		const db = new Low(adapter);

		await db.read();

		db.data ||= [];

		db.data.push(session);

		await db.write();
		res.json('success');
	} catch (error) {
		res.json({ error: { message: 'failed to add session' } });
	}
}
