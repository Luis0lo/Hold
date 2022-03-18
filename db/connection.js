import pg from 'pg';
import { connectionString } from '../configu.js';


const pool = new pg.Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

export default function query(text, params) {
  return pool.query(text, params);
}
