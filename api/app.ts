import express, { Request, Response } from 'express';
import env from 'dotenv';
import getSessions from './lib/getSessions.js';
import addSession from './lib/addSession.js';
import editSession from './lib/editSession.js';
import cors from 'cors';
import helmet from 'helmet';
const app = express();
env.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet())

app.options('/addsession', cors<any>());
app.options('/editsession', cors<any>());
app.options('/auth', cors<any>());

app.get('/sessions', getSessions);
app.post('/addsession', addSession);
app.post('/editsession', editSession);

app.post('/auth', (req: Request, res: Response) => {
	try {
		res.header('Access-Control-Allow-Origin', '*');

		if (req.body.pass === process.env.pass) res.json('passed');
		else res.json('failed');
	} catch (error) {
		res.json('failed');
	}
});
app.get('/*', (req, res) => res.status(404).send('<h1>404 not found</h1>'));
app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));
