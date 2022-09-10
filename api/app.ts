import express, { Request, Response } from 'express';
import env from 'dotenv';
import getSessions from './lib/getSessions.js';
import addSession from './lib/addSession.js';
import editSession from './lib/editSession.js';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import reporter from './lib/reporter.js';
import checkFiles from './lib/checkFiles.js';

const app = express();
env.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	helmet({
		crossOriginResourcePolicy: false,
		contentSecurityPolicy: false
	})
);
app.use(compression());
const __dirname = dirname(fileURLToPath(import.meta.url));
app.options('/addsession', cors<any>());
app.options('/editsession', cors<any>());
app.options('/auth', cors<any>());
app.options('/report', cors<any>());

app.get('/sessions', getSessions);
app.post('/addsession', addSession);
app.post('/editsession', editSession);
app.use(express.static(join(`${__dirname}/../dist/`), { maxAge: '30 days' }));
app.post('/auth', (req: Request, res: Response) => {
	try {
		res.header('Access-Control-Allow-Origin', '*');
		if (req.body.pass === process.env.pass) res.json('passed');
		else res.json('failed');
	} catch (error) {
		res.json('failed');
	}
});
app.get('/', (req: Request, res: Response) => res.sendFile(join(`${__dirname}/../dist/index.html`)));

app.get('/*', (req: Request, res: Response) => res.status(404).send('<h1>404 not found</h1>'));
if (process.env.NODE_ENV === 'production') {
	const runCron = await import('./lib/runCron.js');
	runCron.default();
}

app.post('/report', reporter);

await checkFiles();
env.config(); //refresh env

const PORT = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined ? 5000 : process.env.NODE_ENV;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
