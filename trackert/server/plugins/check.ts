import fs from 'node:fs/promises'

export default defineNitroPlugin(async () => {
  if (!process.env.pass) {
    console.log('Set PASS env.')
    process.exit()
  }

  if (process.env.NODE_ENV === 'production') {
    await checkFiles();

    (await import('../lib/runCron')).default() // start cron job
  }
  else console.log('# DEV mode, skip file check and cron.')
})

/**
 * Function for checking if important files exist.
 * If they don't, they will be created.
 */
async function checkFiles() {
  // check if db folder exists, else create it.
  const DATA_FOLDER_NAME = 'data'
  try {
    await fs.stat(DATA_FOLDER_NAME)
  }
  catch (error) {
    console.log(`@ ${DATA_FOLDER_NAME} folder doesn't exist.`)
    await fs.mkdir(DATA_FOLDER_NAME)
    console.log(`@ Created ${DATA_FOLDER_NAME} folder`)
    await fs.appendFile(`${DATA_FOLDER_NAME}/sessions.json`, '[]')
    console.log(`@ Created ${DATA_FOLDER_NAME}/sessions.json with default [].`)
    console.log('------------------------------------------')
  }
}
