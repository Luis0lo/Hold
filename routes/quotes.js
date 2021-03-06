import express from 'express';
import {
  createQuote,
  getAllQuotes,
  getQuoteById,
  getQuoteByAuthor,
  getQuoteByRanking,
  updateQuoteById,
  deleteQuoteById,
  getRandomQuote,
} from '../models/quotes.js';
const router = express.Router();

/* GET quotes listing and by author. */
router.get('/', async function (req, res, next) {
  const { author, ranking } = req.query;

  // ?author=Warren
  if (author) {
    const quoteByAuthor = await getQuoteByAuthor(author);
    res.json({ success: true, payload: quoteByAuthor });
    return;
  }
  // ?ranking=5
  if (ranking) {
    const quoteByRanking = await getQuoteByRanking(ranking);
    res.json({ success: true, payload: quoteByRanking });
    return;
  }
  const allQuotes = await getAllQuotes();
  res.json({ success: true, payload: allQuotes });
});

router.get('/random', async function (req, res, next) {
  const quote = await getRandomQuote();
  console.log(quote);
  res.json({ payload: quote });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const quoteById = await getQuoteById(id);
  res.json({ success: true, payload: quoteById });
});

router.post('/', async (req, res) => {
  const { author, quote, explanation, ranking } = req.body;
  const createdQuote = await createQuote(author, quote, explanation, ranking);
  res.json({ success: true, payload: createdQuote });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { author, quote, explanation, ranking } = req.body;
  const updatedQuote = await updateQuoteById(
    id,
    author,
    quote,
    explanation,
    ranking
  );
  res.json({ success: true, payload: updatedQuote });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedQuote = await deleteQuoteById(id);
  res.json({ success: true, payload: deletedQuote });
});

export default router;

//populate
// import db from "../../connection.js";

// const response = await db.query(
//   `INSERT INTO users (username, email, favourites) VALUES ($1, $2, $3);`,
//   ["Luis", "luiscvrodrigues@gmail.com", ['Roast peppers', 'Pea Soup']]
// );

// console.log(response);

// db.end();

//delete
// import db from "../../connection.js";

// const response = await db.query(`DROP TABLE IF EXISTS users;`);

// console.log(`users table deleted`, response);

// db.end();