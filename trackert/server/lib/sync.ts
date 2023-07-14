import fs from 'node:fs/promises'
import type { drive_v3 } from 'googleapis'
import { google } from 'googleapis'
import type { Credentials, OAuth2Client } from 'google-auth-library'

export default async function sync() {
  try {
    const credentials = JSON.stringify({
      installed: {
        client_id: '870717362517-0ok8gf9q404p27mdh8pd64c5ud45dpr9.apps.googleusercontent.com',
        project_id: 'logical-handler-336110',
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
        client_secret: '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',
        redirect_uris: ['urn:ietf:wg:oauth:2.0:oob', 'http://localhost']
      }
    })

    return authorize(JSON.parse(credentials).installed, (auth: any) => editRemoteFile(auth))
  }
  catch (error: any) {
    saveError('Sync init failed', error)
  }
}

async function authorize(credentials: any, callback: (...args: any) => any) {
  try {
    const { client_secret, client_id, redirect_uris } = credentials
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])
    const token: Credentials | null = await getAccessToken({ client_secret, client_id })
    token && oAuth2Client.setCredentials(token)

    callback(oAuth2Client)
  }
  catch (error: any) {
    saveError('Authorization failed', error)
  }
}

async function getAccessToken({ client_id, client_secret }: { client_id: string; client_secret: string }): Promise<Credentials | null> {
  try {
    const refresh_token = '1//0c8xctBK7xh51CgYIARAAGAwSNwF-L9IrvFcPJ7itAYMW_19NdAmk7HO33K3tR6Kwl-VfqLjOLhDmBhn5r6mnjhjNMT6OuBMlDyU'

    const token = await $fetch<Credentials>('https://oauth2.googleapis.com/token', {
      method: 'POST',
      body: {
        client_id,
        client_secret,
        refresh_token,
        grant_type: 'refresh_token'
      }
    })

    return token
  }
  catch (error: any) {
    saveError('Fetching access token failed', error)
  }

  return null
}

async function editRemoteFile(auth: OAuth2Client) {
  try {
    const drive = google.drive({ version: 'v3', auth })

    const remoteFile = await getRemoteFile(auth)

    const file = await fs.readFile('data/sessions.json', { encoding: 'utf-8' })

    if (remoteFile?.data)
      remoteFile.data = JSON.parse(file) as drive_v3.Schema$File

    if (remoteFile !== undefined) {
      await drive.files.update({
        fileId: '13CcbTUTWyEGnJQfy7eaVBTUnIcWj4CRx',
        media: {
          mimeType: 'application/json',
          body: JSON.stringify(remoteFile.data)
        }
      })
    }
    else throw new Error(`Remote file is ${remoteFile}.`)
  }
  catch (error: any) {
    saveError('Editing remote file failed', error)
  }
}

async function getRemoteFile(auth: OAuth2Client) {
  try {
    const drive = google.drive({ version: 'v3', auth })

    const remoteFile = await drive.files.get({
      alt: 'media',
      fileId: '13CcbTUTWyEGnJQfy7eaVBTUnIcWj4CRx'
    })

    return remoteFile
  }
  catch (error: any) {
    saveError('Fetching remote file failed', error)
  }
}

function saveError(message: string, error: Error) {
  fs.appendFile('./errors.txt',
    `-------------------------------------------
    ${message}:
  
    ${error?.stack || ''}
  -------------------------------------------
    \n \n`
  ).catch(e => e)
}
