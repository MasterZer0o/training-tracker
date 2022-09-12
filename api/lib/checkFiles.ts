import fs from 'fs/promises';
/**
 * Function for checking if important files exist.
 * If they don't, they will be created.
 */
export default async function checkFiles() {
	// check if db folder exists, else create it.
	try {
		await fs.stat('db');
	} catch (error) {
		console.log("@ DB folder doesn't exist.");
		await fs.mkdir('db');
		console.log("@ Created 'db' folder");
		await fs.appendFile('db/sessions.json', '[]');
		console.log('@ Created db/sessions.json with default [].');
		console.log('------------------------------------------');
	}
	// check if .env exist
	try {
		await fs.stat('.env');
	} catch (error) {
		console.log("@ .env file doesn't exist.");
		await fs.appendFile(
			'.env',
			`PORT=4002
pass=7799
DB_FOLDER_NAME=db`
		);
		console.log('@ Created .env file and filled with defaults.');
	}

	try {
		await fs.stat('api/credentials.json');
	} catch (error) {
		console.log("@ api/credentials.json doesn't exist.");
		console.log('@ Add file manually.');
		console.log('@ Exiting...');

		process.exit(1);
	}
}
