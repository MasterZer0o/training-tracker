import { Ref } from 'vue';
import { BASE_URL } from '../cfg';
import { isError, errorMessage } from '../store';
import { Session } from './session';

export default async function updateSession(e: any, editing: Ref, loader: Ref, updateError: Ref, data: Session) {
	try {
		editing.value = null;
		loader.value = true;
		const path = `${BASE_URL}/editsession`;
		const id = e.target.parentElement.parentElement.dataset.id;
		const { section, date, timeStart, timeEnd, duration }: any = data;

		const session: Session = {
			id,
			section: section.value.querySelector('span').textContent,
			date: date.value.textContent,
			timeStart: timeStart.value.textContent,
			timeEnd: timeEnd.value.textContent,
			duration: duration.value.textContent
		};

		const response = await (
			await fetch(path, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(session)
			})
		).json();

		if ('error' in response) throw response;

		loader.value = false;
	} catch (error: any) {
		loader.value = false;
		isError.value = true;
		errorMessage.value = 'failed to edit session';
		updateError.value = true;
	}
}
