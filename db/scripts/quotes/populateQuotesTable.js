import query from '../../connection.js';
import quotes from '../../../quotes-data.js';

async function populateQuotesTable() {
  for (let i = 0; i < quotes.length; i++) {
    const author = quotes[i].author;
    const quote = quotes[i].quote;
    const explanation = quotes[i].explanation;
    const ranking = quotes[i].ranking;

    const res = await query(
      `INSERT INTO quotes (author, quote, explanation, ranking) VALUES ($1, $2, $3, $4)`,
      [author, quote, explanation, ranking]
    );
    console.log('Quotes Table Populated', res);
  }
}
populateQuotesTable();
