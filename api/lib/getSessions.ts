import { Request, Response } from 'express';
import fs from 'fs/promises';

export default async function getSessions(req: Request, res: Response) {
	res.header('Access-Control-Allow-Origin', '*');
	try {
		const file = await fs.readFile('./api/sessions.json', { encoding: 'utf-8' });
		res.json(JSON.parse(file));
	} catch (error) {
		console.log(error);

		res.json({ error: { message: 'failed to retrieve sessions' } });
	}
}