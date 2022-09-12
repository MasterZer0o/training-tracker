import { BASE_URL } from '../cfg';
import type { Session } from '../../types';

export async function getSessions(): Promise<Session[]> {
	try {
		const path: string = `${BASE_URL}/sessions`;
		const response = await fetch(path);
		const data = await response.json();

		if ('error' in data) throw data;

		return data.reverse();
	} catch (error) {
		return Promise.reject(error);
	}
}
