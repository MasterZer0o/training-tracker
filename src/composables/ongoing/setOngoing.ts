import type { OngoingSession } from '../../../types';
import { ongoingCookieName } from '../../cfg';
import { ongoingSession } from '../../store';
export default function setOngoing(ongoingData: OngoingSession) {
	document.cookie = `${ongoingCookieName}=${JSON.stringify(ongoingData)};max-age=2590000`;	
	ongoingSession.value = ongoingData;
}
