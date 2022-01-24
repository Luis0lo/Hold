import  query  from "../db/connection.js";

export async function getAllQuotes() {
  const result = await query(`SELECT * FROM quotes;`);
  return result.rows;
} 
export async function getQuoteById(id) {
  const data = await query(`SELECT * FROM quotes WHERE id = $1;`, [id]);
  return data.rows;
}

export async function getQuoteByAuthor(author) {
  const data = await query(
    `SELECT * FROM quotes WHERE author ILIKE '%' || $1 || '%';`,
    [author]
  );
  return data.rows;
}
export async function getQuoteByRanking(ranking) {
  const data = await query(
    `SELECT * FROM quotes WHERE ranking = $1;`,
    [ranking]
  );
  return data.rows;
}

export async function createQuote(author, quote, explanation, ranking) {
  const data = await query(
    `INSERT INTO quotes (author, quote, explanation, ranking) VALUES ($1, $2, $3, $4) RETURNING author, quote, explanation, ranking;`,
    [author, quote, explanation, ranking]
  );
  return data.rows;
}

export async function updateQuoteById(id, author, quote, explanation, ranking ) {
  const data = await query(
    `UPDATE quotes SET author = $1, quote = $2, explanation = $3, ranking = $4 WHERE id = $5 RETURNING id, author, quote, explanation, ranking ;`,
    [author, quote, explanation, ranking, id ]
  );
  return data.rows;
}

export async function deleteQuoteById(id) {
  const data = await query(`DELETE FROM quotes where id = $1 RETURNING *;`, [id]);
  return data.rows;
}


