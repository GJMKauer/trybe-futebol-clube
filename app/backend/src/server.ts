import { App } from './app';
import 'dotenv/config';

const PORT = process.env.APP_PORT;

new App().start(PORT as string);
