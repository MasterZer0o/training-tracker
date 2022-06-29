import { fileURLToPath } from 'url';
import { Low, JSONFile } from 'lowdb';
import { join, dirname } from 'path';
import { Request, Response } from 'express';
import type Session from '../Session';
// addSession();
export default async function addSession(req: Request, res: Response) {
	res.header('Access-Control-Allow-Origin', '*');

	const session: Session = req.body;
	console.log(session);

	res.json('success');
	const __dirname = dirname(fileURLToPath(import.meta.url));

	const file = join(__dirname, '../sessions.json');
	const adapter = new JSONFile<any>(file);
	const db = new Low(adapter);

	await db.read();

	db.data ||= [];
	console.log(db.data);
	db.data.push(session);

	await db.write();
}
