import calculateDuration from './calculateDuration';
import type { Session } from '../../types';
import type { Ref } from 'vue';

export function editNewContent(e: any, isNew: boolean = true, showDot: Ref) {
	if (e.target.hasAttribute('contenteditable')) {
		if (e.target.classList.contains('timeEnd')) showDot.value = false;
		else e.target.innerText = '';
	} else return;

	if (isNew === true) window.scrollTo({ top: 0 });
	const observer = new MutationObserver(() => calculateDuration(e.target));
	e.target.classList.contains('date') || e.target.classList.contains('section')
		? undefined
		: observer.observe(e.target, { characterData: true, subtree: true });
}

export function addPlaceholder(sessions: Ref<Session[]>): void {
	const sessionPlaceholder: Session = {
		id: Date.now(),
		section: '',
		date: new Date().toLocaleDateString('pl'),
		timeStart: `${new Date().getHours()}:${
			new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
		}`,
		timeEnd: '',
		duration: '',
		isNew: true
	};

	sessions.value.push(sessionPlaceholder);
}
