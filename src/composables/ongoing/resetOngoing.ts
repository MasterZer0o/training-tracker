import { ongoingCookieName } from '../../cfg';
import { ongoingSession } from '../../store';
export default function resetOngoing() {
	// session ended - reset values..
	ongoingSession.value = {
		is: false,
		data: {
			section: '',
			started: ''
		}
	};
	//remove cookie.
	document.cookie = `${ongoingCookieName}=;max-age=0;`;
}
