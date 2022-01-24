const key = API_KEY;

function getAllTickers() {
  return userShares
    .map((ticker) => {
      return ticker.name;
    })
    .join(',');
}

async function getRealtimeSharePrices() {
  const tickers = getAllTickers();
  const response = await fetch(
    `https://api.stockdata.org/v1/data/quote?symbols=${tickers}&api_token=${key}`
  );
  const data = await response.json();
  // console.log('data fetched', data['data']);
  const realtimePrices = data['data'].map((ticker) => {
    return {
      ticker: ticker.ticker,
      price: ticker.price,
    };
  });
  // console.log('realtimeData from API', realtimePrices);
  return realtimePrices;
}

async function refreshBalance() {
  const sharePrices = await getRealtimeSharePrices();

  userShares.forEach((userShare, i) => {
    var matchingShare = sharePrices.find(
      (sharePrice) => sharePrice.ticker == userShare.name
    );
    if (matchingShare && matchingShare.price)
      userShare.currentMarketValueTotal =
        matchingShare.price * userShare.quantity;
  });
}

const currencies = ['GBP', 'USD', 'EUR'];

function getExchangeUrl(baseCurrency) {
  const baseUrl = 'https://api.stockdata.org/v1/data/currency/latest?';
  const arr = currencies.filter((c) => c !== baseCurrency);
  const symbols = baseCurrency + arr[0] + ',' + baseCurrency + arr[1];
  const exchangeUrl = `${baseUrl}symbols=${symbols}&api_token=${key}`;
  return exchangeUrl;
}

async function getExchangeRates(baseCurrency) {
  const response = await fetch(`${getExchangeUrl(baseCurrency)}`);
  const data = await response.json();
  // console.log('exchange rate data', data);

  const exchangeRates = data['data'].map((x) => {
    return {
      symbol: x[0]['symbol'].slice(-3),
      price: x[0]['price'],
    };
  });
  exchangeRates.push({ symbol: baseCurrency, price: 1 });

  console.log('my mapped exchange rate data', exchangeRates);
  
  return exchangeRates;
}

// function getExchangeValue() {
//   return { USD: 1.34, EUR: 1.18, GBP: 1 };
// }

// const weatherKey = WEATHER_KEY
// const city = 'Manchester'
// async function getWeatherData(){
//   const response = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}&units=metric`)
//   const data = await response.json()
//   console.log(data)
// }

//Option B to get exchange rates
// const exchangeKey = EXCHANGE_API_KEY;
// const currency = 'GBP';
// async function getCurrency() {
//   const response = await fetch(
//     `https://v6.exchangerate-api.com/v6/${exchangeKey}/latest/${currency}`
//   );
//   const data = await response.json();
//   console.log(data.conversion_rates.USD);
//   console.log(data.conversion_rates.EUR);
//   // return [usd, eur]
//   return {USD: 1.34, EUR: 1.18, GBP: 1}
// }
