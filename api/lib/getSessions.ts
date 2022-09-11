import { Request, Response } from 'express';
import fs from 'fs/promises';
import env from 'dotenv';
env.config();

export default async function getSessions(req: Request, res: Response) {
	res.header('Access-Control-Allow-Origin', '*');
	try {
		const file = await fs.readFile(`${process.env.DB_FOLDER_NAME}/sessions.json`, { encoding: 'utf-8' });
		res.json(JSON.parse(file)).status(200);
	} catch (error) {
		res.json({ error: { message: 'failed to retrieve sessions' } }).status(500);
	}
}
