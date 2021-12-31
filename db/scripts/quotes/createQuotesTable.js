import query from '../../connection.js';

async function createQuotesTable() {
  const res = await query(
    `CREATE TABLE IF NOT EXISTS quotes (id SERIAL PRIMARY KEY, author TEXT, quote TEXT, explanation TEXT, ranking INT);`
  );
  console.log('Quotes Table created', res);
}
createQuotesTable();
