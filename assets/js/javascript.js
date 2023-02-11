// Create variable for news API/ alphavantage
var newsApiKey = "Y05JOHE1Z7ATCKW7";
// Create variables for ticker and price API/ Finhub
var tickerApiKey = "cfe7pg9r01qp08kufpagcfe7pg9r01qp08kufpb0";
var priceApiKey = "cfe7pg9r01qp08kufpagcfe7pg9r01qp08kufpb0";

var searchStock = document.querySelector("#searchStocks");
var ticker = document.querySelector("#search-input");
var searchForm = document.querySelector("#search-button");

// Create a function to pull data from search button using the API's
let stockTicker = function (event) {
  event.preventDefault();
  let search = ticker.value;
  if (search) {
    console.log();
  }
  console.log(search);

  // Stock Name Data for stocks
  fetch(`https://finnhub.io/api/v1/search?q=${search}&token=${tickerApiKey}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("first stock", data);
    })
    .catch();

  // Gets Price Data for Stocks
  fetch(`https://finnhub.io/api/v1/quote?symbol=${search}&token=${priceApiKey}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("stock price", data);
      console.log(data.c);
      // Dan says this needs to be in the scope, so I moved it here!
      var symbol = document.querySelector("#symbol");
      symbol.textContent = ` ${search}`;

      var currentPrice = document.querySelector("#currentP");
      currentPrice.textContent = ` Current Price: ${data.c}`;

      var highP = document.querySelector("#highP");
      highP.textContent = ` High Price: ${data.h}`;

      var lowP = document.querySelector("#lowP");
      lowP.textContent = ` Low Price: ${data.l}`;

      var openP = document.querySelector("#openP");
      openP.textContent = ` Open Price: ${data.o}`;

      var prevClose = document.querySelector("#prevClose");
      prevClose.textContent = ` Previous Close: ${data.pc}`;

      var iconFloat = document.querySelector(".material-icons");
      iconFloat.classList.add('icon-float');

      // currentPrice.appendChild(iconFloat);

    })
    .catch((error) => {
      console.log(error);
    });

  // Pulls News data for stock ticker
  fetch(
    `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${search}&apikey=${newsApiKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("stock news", data);
      console.log(data.feed);


      if (!data.feed) {
        console.log("No Results");
        search.innerHTML = '<h3>No results found, search again!</h3>';
      } else {
        search.innerHTML = '';
        // Creating cards for news articles
        for (var i = 0; i < 5; i++) {
          var articleEl = document.querySelector('.current-news')
          var articleData = data.feed[i]

          var cardBody = document.createElement('div');
          var articletitle = document.createElement('h5');
          var articleSummary = document.createElement('p');
          var linkButtonEl = document.createElement('a');

          cardBody.classList.add('card');
          articleSummary.textContent = 'Summary: ' + articleData.summary
          articletitle.textContent = 'Title: ' + articleData.title
          linkButtonEl.textContent = 'Read More';
          linkButtonEl.setAttribute('href', articleData.url);
          linkButtonEl.classList.add('btn');

          articleEl.appendChild(cardBody);
          cardBody.appendChild(articletitle);
          cardBody.appendChild(articleSummary);
          cardBody.appendChild(linkButtonEl);
        }
      }
    })

    .catch();

  console.log(data[0]);
  // comment from Jesus - append ticker data into div
  var currentSymbol = document.querySelector("#symbol");
  currentSymbol.textContent = `Symbol: ${search}`;

  // variable to include ALL stock info?
  var stockInfo = document.querySelector(".current-prices");
};

// Create event listeners for the search
searchForm.addEventListener("click", stockTicker);

// Use a fetch call to gather information from the API
// use local storage to save watchlist stocks

