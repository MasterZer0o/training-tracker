import { fileURLToPath } from 'url';
import { Low, JSONFile } from 'lowdb';
import { join, dirname } from 'path';
import type { Session } from '../../types';

export default async function getDb() {
	try {
		const __dirname = dirname(fileURLToPath(import.meta.url));

		const filePath = join(__dirname, '../../db/sessions.json');

		const adapter = new JSONFile<Session[]>(filePath);
		const db = new Low(adapter);
		await db.read();
		db.data ||= [];
		return db;
	} catch (error) {
		return {
			error: 'Failed to get db.'
		};
	}
}
