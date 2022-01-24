# Hold

One place! Forget about opening different brokers to get a sense of your live balance investments

Project features:

Add your shares and get the live balance of your investment in your preferred currency.

Check for inspirational quotes to keep holding your shares, contribute with more quotes, edit and delete them if you like so.

## Getting Started

### To build from zero

- [npx express-generator-esmodules --git -p -d](https://www.npmjs.com/package/express-generator-esmodules)  
  -p for PostgreSQL database connection  
  -d create a development mode  
  --git .gitignore to hold files such .env
- **npm i -D nodemon** to automatically restarting the node application when file changes in the directory are detected.

## If you clone the repo

- npm i  
  npm install downloads dependencies defined in a package. json file and generates a node_modules folder with the installed modules.

**External API**

- Get an API_KEY from [stockData.org](https://www.stockdata.org/documentation) and add into [env.js](https://github.com/Luis0lo/Hold/blob/main/public/js/envExample.js) (you'll get live share prices and exchange rates from this API).

**Database**

- Create an app on [Heroku](https://www.heroku.com) with a Heroku Postgres Add-on to hold the quote API.
- Fill up this [.env](https://github.com/Luis0lo/Hold/blob/main/.env.example) file with your credentials from heroku

**VS code Terminal**

- npm run dbcreatequotestable
- npm run dbpopulatequotestable
- npm run dev  
  the app will run on http://localhost:3000/ with basic quotes [data](https://github.com/Luis0lo/Hold/blob/main/quotes-data.js)

## Folder structure

public

> js
>
> > **main.js** (main logic of the app, percentages, currency covertion etc...)  
> > **api.js** (fetch the external API for shares price and exchange rates)  
> > **quoteApi.js** (quotes logic, CRUD operations client side with DOM manipulation)

> **index.html** (what is render to the browser)

bin (listen PORT defined)

db

> scripts
>
> > **createQuotesTable.js** (SQL create table)  
> > **populateQuotesTable.js** (SQL insert data to table)

> **connection.js** (set postgres connection )

models

> **quotes.js** (defined CRUD to connect with the database)

routes

> **quotes.js** (defined CRUD routes)

**App.js** (main app setup)

## state of the art - limitations

- Able to Fetch only up to 3 different shares (you'll need to update the fetch request to get all of the live prices for userShares object).
- Major currencies available to select as base USD, GBP and EUR.
- User shares is a dummy database, object inserted on [main.js](https://github.com/Luis0lo/Hold/blob/main/public/js/main.js)
