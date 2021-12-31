const shares = [
  {
    name: 'TSLA',
    quantity: 2,
    price: 1000,
    total: 2000,
    liveTotal: 0,
    currency: 'USD',
  },
  {
    name: 'AAPL',
    quantity: 10,
    price: 150,
    total: 1500,
    liveTotal: 0,
    currency: 'USD',
  },
  {
    name: 'GOOGL',
    quantity: 2,
    price: 2900,
    total: 5800,
    liveTotal: 0,
    currency: 'USD',
  },
];
const user = {
  firstName: 'Luis',
  lastName: 'Rodrigues',
  currency: 'GBP'
}

const submitButton = document.querySelector('#add-shares-btn');
submitButton.addEventListener('click', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  doesShareExists();
  document.querySelector('form').reset();
  console.log(shares);
}

function doesShareExists() {
  const data = getShareData();
  const index = shares.findIndex(function (share) {
    return share.name === data.name;
  });
  if (index >= 0) {
    return updateShare(index, data);
  }
  addNewShare(data);
}

function addNewShare({ name, quantity, price, currency }) {
  shares.push({
    name: name,
    quantity: Number(quantity),
    price: Number(price),
    total: Number(quantity * price),
    currency: currency,
  });
}

function updateShare(index, { quantity, price }) {
  const shareNumber = (shares[index].quantity += Number(quantity));
  const currentTotal = quantity * price;
  const sharePrice = (shares[index].total + currentTotal) / shareNumber;
  shares[index].price = sharePrice;
  shares[index].total = shareNumber * sharePrice;
  // console.log(shares[index]);
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

//get the total value of the foreign shares in GBP
function getGbpValue(currency, value, invested) {
  currency = shares
    .filter((i) => i.currency === currency)
    .reduce((total, share) => {
      const balance = total + share[`${invested}`];
      return balance;
    }, 0);
  return Math.round(currency / value);
}

// get the portfolio total value in GBP
// async function gbpBalance(total) {
//   const { USD, EUR, GBP } = await getExchangeValue();
//   return (
//     getGbpValue('USD', USD, total) + getGbpValue('GBP', GBP, total) + getGbpValue('EUR', EUR, total)
//   );
// }
async function getConvertionOf(total) {
  const exchange = await getExchangeValue(user.currency);
  return Object.entries(exchange).reduce((acc, [key, value]) => {
     return acc + getGbpValue(key, value, total)
  }, 0);
}

async function getBalance() {
  await getLiveBalance();
  const totalBalance = await getConvertionOf('total');
  const liveBalance = await getConvertionOf('liveTotal');
  console.log(shares);


  console.log( 'Invested', totalBalance, 'Live', liveBalance);
  showBalance(liveBalance, totalBalance);
}

function showBalance(liveBalance, totalBalance) {
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
    newP.innerText = `£ ${liveBalance} `;
    displayDiv.appendChild(newDiv);
    newDiv.appendChild(newP);
  }
  // setTimeout(() => (displayDiv.innerText = 'You are good!'), 4000);
}
