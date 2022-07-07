import { CronJob } from 'cron';
import sync from './sync.js';
export default function runCron() {
	const job = new CronJob(
		//every 15 hours
		'0 0 */15 * * *',
		sync,
		null,
		true
	);
}
