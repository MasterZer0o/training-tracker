import type { Request, Response } from 'express';
import mailer from 'nodemailer';
import fs from 'fs/promises';
import handlebars from 'handlebars';
export default async function reporter(req: Request, res: Response) {
	try {
		res.header('Access-Control-Allow-Origin', '*');
		const { error, instance, info } = req.body;

		const template = await fs.readFile('./api/error-template.hbs', { encoding: 'utf-8' });
		const compile = handlebars.compile(template, { preventIndent: true });
		const compiledHTML = compile({ error: error, instance: JSON.stringify(instance), info });

		const mailConfig = {
			from: 'j.undermountain@gmail.com',
			to: 'trinitxyz@gmail.com',
			subject: 'trackert error',
			text: 'Error in trackert app.',
			html: compiledHTML
		};

		const transporterConfig = {
			host: 'smtp.gmail.com',
			port: 465,
			secure: true, // true for 465, false for other ports
			auth: {
				user: 'j.undermountain@gmail.com',
				pass: 'mkecbvqeekuxybaz'
			}
		};

		const transporter = mailer.createTransport(transporterConfig);

		if (process.env.NODE_ENV === 'production') {
			transporter.sendMail(mailConfig, (error, info) => {
				if (error) console.log(`Error occurred: ${error}`, 'info', info);
				else console.log('Message sent.');
			});
		}
	} catch (error) {
	} finally {
		res.end();
	}
}
