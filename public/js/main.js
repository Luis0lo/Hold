const userShares = [
  {
    name: 'TSLA',
    quantity: 2,
    price: 700,
    // For future extension - track user transactions to give accurate figures
    // Right now, we are converting a historic price every time we use the app.
    // orders: [
    //   {
    //     date: '2020-01-01:14:00:00',
    //     price: 1000,
    //     quantity: 3,
    //     currency: USD,
    //     currencyPaid: GBP,
    //     exchangeRate: 1.12,
    //     totalPaidInLocalCurrency: '', // (quantity * price) */ exchangeRate
    //   },
    //   {},
    // ],
    total: 1400,
    currentMarketValueTotal: 0,
    currency: 'USD',
  },
  // {
  //   name: 'AAPL',
  //   quantity: 10,
  //   price: 150,
  //   total: 1500,
  //   currentMarketValueTotal: 0,
  //   currency: 'USD',
  // },
  {
    name: 'GOOGL',
    quantity: 2,
    price: 2500,
    total: 5000,
    currentMarketValueTotal: 0,
    currency: 'USD',
  },
];
const user = {
  firstName: 'Luis',
  lastName: 'Rodrigues',
  currency: 'GBP',
};

const selectcurrencyBtn = document.querySelector('#currency-list-btn');

function selectCurrency() {
  const currencySelected = document.querySelector('#currencyList').value;
  user.currency = currencySelected;
  console.log('currency selected', currencySelected);
}

selectcurrencyBtn.addEventListener('click', selectCurrency);

const submitButton = document.querySelector('#add-shares-btn');
submitButton.addEventListener('click', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  doesShareExists();
  document.querySelector('form').reset();
}

function doesShareExists() {
  const data = getShareData();
  const index = userShares.findIndex(function (share) {
    return share.name === data.name;
  });
  if (index >= 0) {
    return updateShare(index, data);
  }
  addNewShare(data);
}

function addNewShare({ name, quantity, price, currency }) {
  userShares.push({
    name: name,
    quantity: Number(quantity),
    price: Number(price),
    total: Number(quantity * price),
    currency: currency,
  });
}

function updateShare(index, { quantity, price }) {
  const shareNumber = (userShares[index].quantity += Number(quantity));
  const currentTotal = quantity * price;
  const sharePrice = (userShares[index].total + currentTotal) / shareNumber;
  userShares[index].price = sharePrice;
  userShares[index].total = shareNumber * sharePrice;
}

function getShareData() {
  const name = document.querySelector('#ticker-name').value;
  const quantity = document.querySelector('#number-shares').value;
  const price = document.querySelector('#price-shares').value;
  const currency = document.querySelector('#currency-shares').value;
  return {
    name,
    quantity,
    price,
    currency,
  };
}

const balanceBtn = document.querySelector('#balance-btn');
balanceBtn.addEventListener('click', getBalance);

async function getConvertedTotals() {
  const exchangeRates = await getExchangeRates(user.currency);
  console.log('exhange---', exchangeRates);
  let runningInvestedTotal = 0;
  let runningCurrentMarketTotal = 0;
  userShares.forEach((share) => {
    console.log(share);
    let exchangeRate = exchangeRates.find(
      (rate) => rate.symbol === share['currency']
    );
    console.log(exchangeRate);
    runningInvestedTotal += share['total'] / exchangeRate.price;
    runningCurrentMarketTotal +=
      share['currentMarketValueTotal'] / exchangeRate.price;
  });

  return {
    runningInvestedTotal,
    runningCurrentMarketTotal,
  };
}

async function getBalance() {
  await refreshBalance();
  const convertedBalances = await getConvertedTotals();

  console.log(
    'Invested',
    convertedBalances.runningInvestedTotal,
    'Live',
    convertedBalances.runningCurrentMarketTotal
  );

  showBalance(
    convertedBalances.runningInvestedTotal,
    convertedBalances.runningCurrentMarketTotal
  );
}

function showBalance(totalBalance, liveBalance) {
  const newDiv = document.createElement('div');
  const newP = document.createElement('p');
  newP.setAttribute('id', 'p-final-balance');
  const displayDiv = document.querySelector('.display-balance');
  displayDiv.innerText = '';
  if (liveBalance < totalBalance) {
    newDiv.classList.add('display-live-balance-negative');
    newDiv.innerText = 'Hold Tight';
    displayDiv.appendChild(newDiv);
  } else {
    newDiv.classList.add('display-live-balance');
    newP.innerText = `${getUserSymbol()} ${liveBalance.toLocaleString()}`;
    displayDiv.appendChild(newDiv);
    newDiv.appendChild(newP);
  }
  // setTimeout(() => (displayDiv.innerText = 'You are good!'), 4000);
}

function getUserSymbol() {
  return user.currency === 'USD' ? '$' : user.currency === 'GBP' ? '£' : '€';
}
