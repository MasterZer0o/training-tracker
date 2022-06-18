export interface Session {
	id: number;
	section: string;
	date: string;
	timeStart: string;
	timeEnd: string;
	duration: string;
	isNew?: boolean;
}

export async function getSessions(): Promise<Session[]> {
	try {
		const path = `${window.location.protocol}//${window.location.hostname}:5000/main`;
		const response = await fetch(path);
		const data = await response.json();

		return data.reverse();
	} catch (error) {
		Promise.reject(error);
	}
}
