import { drive_v3, google } from 'googleapis';
import { Credentials, OAuth2Client } from 'google-auth-library';
import fetch from 'node-fetch';
import fs from 'fs/promises';
const pathPrefix = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined ? 'api' : 'server';

export default async function sync() {
	try {
		const credentials = await fs.readFile(`${pathPrefix}/credentials.json`, { encoding: 'utf-8' });

		return authorize(JSON.parse(credentials).installed, (auth: any) => editRemoteFile(auth));
	} catch (error) {
		await fs.appendFile(
			'./errors.txt',
			`-------------------------------------------
				Error while beginning to sync:
				${error}
-------------------------------------------
\n \n`
		);
	}
}

async function authorize(credentials: any, callback: (...args: any) => any) {
	try {
		const { client_secret, client_id, redirect_uris } = credentials;
		const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
		const token: Credentials | null = await getAccessToken({ client_secret, client_id });
		token && oAuth2Client.setCredentials(token);

		callback(oAuth2Client);
	} catch (error) {
		await fs.appendFile(
			'./errors.txt',
			`-------------------------------------------
			Error while authorizing:
			${error}
-------------------------------------------
\n \n`
		);
	}
}
//prettier-ignore
async function getAccessToken({ client_id, client_secret }: { client_id: string, client_secret: string }): Promise<Credentials | null> {
	try {
		const refresh_token =
		'1//0c8xctBK7xh51CgYIARAAGAwSNwF-L9IrvFcPJ7itAYMW_19NdAmk7HO33K3tR6Kwl-VfqLjOLhDmBhn5r6mnjhjNMT6OuBMlDyU';

	const response = await fetch('https://oauth2.googleapis.com/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			client_id: client_id,
			client_secret: client_secret,
			refresh_token: refresh_token,
			grant_type: 'refresh_token'
		})
	});
	const token = (await response.json()) as Credentials;
	return token;
	} catch (error) {
		await fs.appendFile(
			'./errors.txt',
			`-------------------------------------------
			Error while getting access token:
			${error}
-------------------------------------------
\n \n`
			
		);
	}
	return null
}

async function editRemoteFile(auth: OAuth2Client) {
	try {
		const drive = google.drive({ version: 'v3', auth });

		const remoteFile = await getRemoteFile(auth);

		const file = await fs.readFile(`${process.env.DB_FOLDER_NAME}/sessions.json`, { encoding: 'utf-8' });
		remoteFile?.data ? (remoteFile.data = JSON.parse(file) as drive_v3.Schema$File) : null;
		if (remoteFile !== undefined) {
			await drive.files.update({
				fileId: '13CcbTUTWyEGnJQfy7eaVBTUnIcWj4CRx',
				media: {
					mimeType: 'application/json',
					body: JSON.stringify(remoteFile.data)
				}
			});
		} else throw new Error(`Remote file is ${remoteFile}.`);
	} catch (error) {
		await fs.appendFile(
			'./errors.txt',
			`-------------------------------------------
			Error while editing remote file:
			${error}
-------------------------------------------
\n \n`
		);
	}
}

async function getRemoteFile(auth: OAuth2Client) {
	try {
		const drive = google.drive({ version: 'v3', auth });

		const remoteFile = await drive.files.get({
			alt: 'media',
			fileId: '13CcbTUTWyEGnJQfy7eaVBTUnIcWj4CRx'
		});

		return remoteFile;
	} catch (error) {
		await fs.appendFile(
			'./errors.txt',
			`-------------------------------------------
			Error while getting remote file:
			${error}
-------------------------------------------
\n \n`
		);
	}
}

