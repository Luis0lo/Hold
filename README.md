# Hold

One place! Forget about opening different brokers to get a sense of your live balance investments

Project features:

Add your shares and get the live balance of your investment in your preferred currency.

Check for inspirational quotes to keep holding your shares, contribute with more quotes, edit and delete them if you like so.

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
