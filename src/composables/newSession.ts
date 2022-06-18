import calculateDuration from './calculateDuration';
import { Session } from './session';
import { Ref } from 'vue';

export function editNewContent({ target }: any): void {
	if (target.hasAttribute('contenteditable')) {
		target.textContent = '';
	} else return;

	const observer = new MutationObserver(calculateDuration);
	observer.observe(document.querySelector('.timeEnd'), { characterData: true, subtree: true });
}

export function addPlaceholder(sessions: Ref): void {
	const sessionPlaceholder: Session = {
		id: Math.floor(Math.random() * 100000),
		section: 'insert part',
		date: new Date().toLocaleDateString('pl'),
		timeStart: 'start',
		timeEnd: 'end',
		duration: '',
		isNew: true
	};
 
	sessions.value = [sessionPlaceholder, ...sessions.value];
}
