import calculateDuration from './calculateDuration';
import { Session } from './session';
import { Ref } from 'vue';

export function editNewContent(e: any): void {
	if (e.target.hasAttribute('contenteditable')) {
		e.target.innerText = '';
	} else return;
	window.scrollTo({ top: 0 });
	const observer = new MutationObserver(() => calculateDuration(e.target));
	e.target.classList.contains('date') || e.target.classList.contains('section')
		? undefined
		: observer.observe(e.target, { characterData: true, subtree: true });
}

export function addPlaceholder(sessions: Ref<Session[]>): void {
	const sessionPlaceholder: Session = {
		id: Date.now(),
		section: 'part',
		date: new Date().toLocaleDateString('pl'),
		timeStart: `${new Date().getHours()}:${
			new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
		}`,
		timeEnd: 'end',
		duration: '',
		isNew: true
	};

	sessions.value.push(sessionPlaceholder);
}
