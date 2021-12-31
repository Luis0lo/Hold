// to get real data toggle comment on lines 27-28 and
//toggle comment getExchangeValue lines 37-38

const key = API_KEY;

function getAllTickers() {
  return (allTickers = shares
    .map((ticker) => {
      return ticker.name;
    })
    .join(','));
}

async function getStockData() {
  const tickers = getAllTickers();
  const response = await fetch(
    `https://api.stockdata.org/v1/data/quote?symbols=${tickers}&api_token=${key}`
  );
  const data = await response.json();
  console.log('data fetched', data['data']);
  const price = data['data'].map((ticker) => {
    return ticker.price;
  });
  return price;
}

async function getLiveBalance() {
  // const currentPrice =await getStockData()
  const currentPrice = [1060, 178, 2938];
  // add total live total into the database
  shares.forEach((share, i) => {
    share.liveTotal = currentPrice[i] * share.quantity;
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

// async function getExchangeValue(baseCurrency) {
//   const response = await fetch(`${getExchangeUrl(baseCurrency)}`);
//   const data = await response.json();

//   const exchangeArr = [];
//   data['data'].map((x) => {
//     Object.entries(x[0]).filter(([key, value]) => {
//       if (key === 'symbol') exchangeArr.push(value.slice(-3));
//       if (key === 'price') exchangeArr.push(value);
//     });
//   });

//   const obj = { [baseCurrency]: 1 };
//   for (let i = 0; i < exchangeArr.length; i += 2) {
//     const key = exchangeArr[i];
//     const value = exchangeArr[i + 1];
//     obj[key] = value;
//   }

//   return obj;
// }

function getExchangeValue(){
  return {USD: 1.34, EUR: 1.18, GBP: 1}
}

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
