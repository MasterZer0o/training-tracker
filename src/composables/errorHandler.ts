import type { ComponentPublicInstance } from 'vue';
import { BASE_URL } from '../cfg';

export default async function errorHandler(error: any, instance: ComponentPublicInstance | null, info: string) {
	try {
		await fetch(`${BASE_URL}/report`, {
			method: 'POST',
			body: JSON.stringify({ error: error.stack || error, instance, info }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {}
}
