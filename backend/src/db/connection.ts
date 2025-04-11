import pg from 'pg';
const { Pool } = pg;
import dotenv from 'dotenv';

const ENV = process.env.NODE_ENV || 'production';

dotenv.config({
  path: `.env.${ENV}`,
});
if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error('Database is not set');
}

const config: Record<string, any> = {};

if (ENV === 'production') {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
}

const pool = new Pool(config);

export default pool;
