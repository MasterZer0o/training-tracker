import { netStatus } from '../store';

export default function handleNet() {
	window.addEventListener('offline', () => (netStatus.value = 'offline'));
}
