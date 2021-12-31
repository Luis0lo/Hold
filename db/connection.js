import pg from 'pg';

const pool = new pg.Pool({
  ssl: { rejectUnauthorized: false },
});

export default function query(text, params) {
  return pool.query(text, params);
}
