import { Ref } from 'vue';
import { BASE_URL } from '../cfg';
import { isError, errorMessage, ongoingSession } from '../store';
import getOngoing from './ongoing/getOngoing';
import resetOngoing from './ongoing/resetOngoing';
import type { OngoingSession, Session } from '../../types';
import setOngoing from './ongoing/setOngoing';

export default async function updateSession(e: any, editing: Ref, loader: Ref, updateError: Ref, data: Session) {
	try {
		editing.value = null;
		loader.value = true;
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
			await fetch(`${BASE_URL}/editsession`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(session)
			})
		).json();

		if ('error' in response) throw response;

		// session ended - reset.
		if (session.timeEnd.length > 0) resetOngoing();
		else {
			const ongoing = getOngoing();
			if (ongoing !== null) {
				const ongoingData: OngoingSession = {
					is: true,
					data: {
						section: section.value.querySelector('span').textContent,
						started: ongoing.data.started
					}
				};
				setOngoing(ongoingData);
			}
		}

		loader.value = false;
	} catch (error: any) {
		console.error(error);

		loader.value = false;
		isError.value = true;
		errorMessage.value = 'failed to edit session';
		updateError.value = true;
	}
}
