import { CronJob } from 'cron'
import sync from './sync'

export default function runCron() {
  const job = new CronJob(
    // every 15 hours
    '0 0 */24 * * *',
    sync,
    null,
    true
  )
}
