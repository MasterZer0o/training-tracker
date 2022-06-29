import { Ref } from 'vue';
import { Session } from './session';

export default async function updateSession(e: any, editing: Ref, loader: Ref, updateError: Ref, data: Session) {
	try {
		editing.value = false;
		loader.value = true;
		const path = `${window.location.protocol}//${window.location.hostname}/editfile`;
		let id = e.target.parentElement.parentElement.dataset.id;
		const { section, date, timeStart, timeEnd, duration }: any = data;

		const session: Session = {
			id,
			section: section.value.textContent,
			date: date.value.textContent,
			timeStart: timeStart.value.textContent,
			timeEnd: timeEnd.value.textContent,
			duration: duration.value.textContent
		};

		await fetch(path, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(session)
		});
		loader.value = false;
	} catch (error) {
		loader.value = false;
		updateError.value = true;
	}
}
