import { app } from 'electron';

export type ENV = 'MAIN_WINDOW_ID' | 'ABOUT_WINDOW_ID' | 'SETTINGS_WINDOW_ID';
import path from 'path';
export const DATABASE_URL =
  process.env.NODE_ENV === 'production'
    ? path.join(app.getPath('userData'), 'clippy.db')
    : path.join(__dirname, '../prisma/clippy.db');

export const prismaClientConfig = {
  datasources: { db: { url: `file:${DATABASE_URL}` } },
};
