//fetching from quotes database
async function getQuotesData() {
  const response = await fetch('http://localhost:3000/quotes');
  const data = await response.json();
  return data;
}
async function getQuoteById(id) {
  const response = await fetch(`http://localhost:3000/quotes/${id}`);
  const data = await response.json();
  return data.payload[0].explanation;
}

//get and display random quote
async function getRandomQuote() {
  const { payload } = await getQuotesData();
  const quote = payload[Math.floor(Math.random() * payload.length)];
  return quote;
}

const displayQuote = document.querySelector('#display-quote');

async function showQuote() {
  const { id, quote, ranking } = await getRandomQuote();
  const showMoreBtn = document.createElement('button');
  showMoreBtn.setAttribute('id', 'show-more');
  showMoreBtn.setAttribute('value', id);
  showMoreBtn.innerText = '⭐'.repeat(ranking) + ' ...more';
  //after: append btn after display quote
  displayQuote.after(showMoreBtn);
  //   console.log(id, quote);
  displayQuote.innerText = quote;
}
showQuote();

//display quote explanation when btn clicked
document.addEventListener('click', function (e) {
  if (e.target && e.target.id == 'show-more') {
    showExplanation(e.target.value);
  }
});

const displayExplanation = document.querySelector('#explanation');

async function showExplanation(value) {
  const explanation = await getQuoteById(value);
  displayExplanation.innerText = explanation;
  const btn = document.querySelector('#show-more');
  btn.remove();
}

//display the form to add new quotes to the database
//display the search form, show edit, delete options
const quoteFormArea = document.querySelector('#input-quote-form');
const quoteSearchFormArea = document.querySelector('#search-quote-form');
const quoteEditFormArea = document.querySelector('#edit-quote-form');
const displayAddFormBtn = document.querySelector('#display-add-quote-btn');
const displaySearchFormBtn = document.querySelector(
  '#display-search-quote-btn'
);

displayAddFormBtn.addEventListener('click', displayAddForm);
displaySearchFormBtn.addEventListener('click', displaySearchForm);

function displayAddForm() {
  quoteSearchFormArea.classList.remove('visible');
  quoteEditFormArea.classList.remove('visible');
  quoteFormArea.classList.toggle('visible');
}
function displaySearchForm() {
  quoteFormArea.classList.remove('visible');
  quoteEditFormArea.classList.remove('visible');
  quoteSearchFormArea.classList.toggle('visible');
}

//grab data from form and post into quotes database
const submitQuoteBtn = document.querySelector('#quote-form-btn');
submitQuoteBtn.addEventListener('click', handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();
  addQuote();
  document.querySelector('form').reset();
  quoteFormArea.classList.remove('visible');
}

async function addQuote() {
  const response = await fetch('http://localhost:3000/quotes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(getFormData()),
  });
  //   const data = await response.json();
  //   return data;
}

function getFormData() {
  const author = document.querySelector('#quote-author-form').value;
  const quote = document.querySelector('#quote-form').value;
  const explanation = document.querySelector('#quote-explanation-form').value;
  const ranking = document.querySelector('input[name="ranking"]:checked').value;
  return {
    author,
    quote,
    explanation,
    ranking,
  };
}

//select the button
const searchAuthorBtn = document.querySelector('#search-author-btn');
const searchRankingBtn = document.querySelector('#search-ranking-btn');
const searchAll = document.querySelector('#search-all');
//add eventlistener to the button to fetch

searchAuthorBtn.addEventListener('click', handleSearchAuthor);
searchRankingBtn.addEventListener('click', handleSearchRanking);
searchAll.addEventListener('click', handleSearchAll);

async function handleSearchAuthor() {
  const name = document.querySelector('#search-author-input').value;
  const payload = await getDataByAuthor(name);
  displaySearch(payload);
}

async function handleSearchRanking() {
  const ranking = document.querySelector('#search-ranking-input').value;
  const payload = await getDataByRanking(ranking);
  displaySearch(payload);
}

async function handleSearchAll() {
  const { payload } = await getQuotesData();
  displaySearch(payload);
  // console.log(payload)
}
//do the fecth requirement

async function getDataByAuthor(name) {
  const response = await fetch(`http://localhost:3000/quotes?author=${name}`);
  const data = await response.json();
  console.log(data.payload);
  return data.payload;
}
async function getDataByRanking(ranking) {
  const response = await fetch(
    `http://localhost:3000/quotes?ranking=${ranking}`
  );
  const data = await response.json();
  console.log(data.payload);
  return data.payload;
}

//render the info info below the search
const searchDisplayArea = document.querySelector('#search-all-div');

function displaySearch(payload) {
  searchDisplayArea.innerText = '';
  payload.forEach((quote) => {
    const div = document.createElement('div');
    div.setAttribute('id', 'generated-main-div');
    searchDisplayArea.appendChild(div);
    const div1 = document.createElement('div');
    div.appendChild(div1);
    const div2 = document.createElement('div');
    div2.setAttribute('id', 'generated-secondary-div');

    div.appendChild(div2);

    //info
    const pQuote = document.createElement('p');
    const pAuthor = document.createElement('p');
    const pExplanation = document.createElement('p');
    const pRanking = document.createElement('p');
    pQuote.innerText = quote.quote;
    pAuthor.innerText = 'By ' + quote.author;
    pExplanation.innerText = quote.explanation;
    pRanking.innerText = '⭐'.repeat(quote.ranking);
    div1.appendChild(pQuote);
    div1.appendChild(pAuthor);
    div1.appendChild(pExplanation);
    div1.appendChild(pRanking);

    //buttons
    const editbtn = document.createElement('button');
    editbtn.innerText = 'Edit';
    editbtn.setAttribute('id', 'edit-quote');
    editbtn.setAttribute('value', quote.id);
    div2.appendChild(editbtn);
    const deletebtn = document.createElement('button');
    deletebtn.innerText = 'Delete';
    deletebtn.setAttribute('id', 'delete-quote');
    deletebtn.setAttribute('value', quote.id);
    div2.appendChild(deletebtn);
  });
}

//delete a quote
document.addEventListener('click', function (e) {
  if (e.target && e.target.id == 'delete-quote') {
    handleDelete(e.target.value);
  }
});

function handleDelete(id) {
  deleteQuote(id);
  //TODO remove the quote istead of refreshing the list
  handleSearchAll();
}

async function deleteQuote(id) {
  const response = await fetch(`http://localhost:3000/quotes/${id}`, {
    method: 'DELETE',
  });
}

//edit a quote
document.addEventListener('click', function (e) {
  if (e.target && e.target.id == 'edit-quote') {
    handleEdit(e.target.value);
  }
});

async function handleEdit(id) {
  const { author, quote, explanation, ranking } = await getQuoteByIdd(id);
  console.log(author);
  const inputAuthor = document.querySelector('#quote-author-edit');
  inputAuthor.setAttribute('value', author);
  const inputQuote = document.querySelector('#quote-edit');
  inputQuote.setAttribute('value', quote);
  const inputExplanation = document.querySelector('#quote-explanation-edit');
  inputExplanation.setAttribute('value', explanation);
  const inputRanking = document.querySelectorAll(`input[value='${ranking}']`);
  inputRanking[1].setAttribute('checked', true);
  const inputId = document.querySelector('#quote-id-edit');
  inputId.setAttribute('value', id);
  displayEditForm();
  quoteSearchFormArea.innerText = '';
}

async function getQuoteByIdd(id) {
  const response = await fetch(`http://localhost:3000/quotes/${id}`);
  const data = await response.json();
  return data.payload[0];
}
function displayEditForm() {
  searchDisplayArea.innerText = '';
  quoteEditFormArea.classList.toggle('visible');
}

const editQuoteBtn = document.querySelector('#quote-form-edit-btn');
editQuoteBtn.addEventListener('click', handleSubmitEdit);

function handleSubmitEdit() {
  const id = document.querySelector('#quote-id-edit').value;
  editQuote(id);
}

async function editQuote(id) {
  console.log(id);
  const response = await fetch(`http://localhost:3000/quotes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(getEditFormData()),
  });
  //   const data = await response.json();
  //   return data;
}

function getEditFormData() {
  const author = document.querySelector('#quote-author-edit').value;
  const quote = document.querySelector('#quote-edit').value;
  const explanation = document.querySelector('#quote-explanation-edit').value;
  const ranking = document.querySelector(
    'input[name="ranking-edit"]:checked'
  ).value;
  return {
    author,
    quote,
    explanation,
    ranking,
  };
}
