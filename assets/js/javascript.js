window.localStorage;
// Create variable for news API/ alphavantage
var newsApiKey = "Y05JOHE1Z7ATCKW7";
// Create variables for ticker and price API/ Finhub
var tickerApiKey = "cfe7pg9r01qp08kufpagcfe7pg9r01qp08kufpb0";
var priceApiKey = "cfe7pg9r01qp08kufpagcfe7pg9r01qp08kufpb0";

var searchStock = document.querySelector("#searchStocks");
var ticker = document.querySelector("#search-input");
var searchForm = document.querySelector("#search-form");

// Create a function to pull data from search button using the API's
let stockTicker = function (search) {

  console.log(search);
  //adding local storage

  if (localStorage.getItem("watch-list") && !localStorage.getItem('watch-list').includes(search)) {
    const arrayFromStorage = JSON.parse(localStorage.getItem("watch-list"));
    arrayFromStorage.push(search);
    localStorage.setItem("watch-list", JSON.stringify(arrayFromStorage));
  }
  else if (!localStorage.getItem('watch-list')) {

    localStorage.setItem("watch-list", JSON.stringify([search]));
  }


  populateWatchlist()

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

      //var iconFloat = document.querySelectorAll(".material-icons");
      var iconFloat = document.getElementsByClassName("small");
      iconFloat.classList.add("icon-float");
      //iconFloat.setAttribute("class", "icon-float");

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
        search.innerHTML = "<h3>No results found, search again!</h3>";
      } else {
        search.innerHTML = "";
        // Creating cards for news articles
        var articleEl = document.querySelector(".current-news");
        articleEl.textContent = ''
        for (var i = 0; i < 5; i++) {
          var articleData = data.feed[i];

          var cardBody = document.createElement("div");
          var articletitle = document.createElement("h5");
          var articleSummary = document.createElement("p");
          var linkButtonEl = document.createElement("a");

          cardBody.classList.add('card');
          articleSummary.textContent = 'Summary: ' + articleData.summary
          articletitle.textContent = 'Title: ' + articleData.title
          linkButtonEl.textContent = 'Read More';
          linkButtonEl.setAttribute('href', articleData.url);
          linkButtonEl.setAttribute('target', '_blank');
          linkButtonEl.classList.add('btn');

          articleEl.appendChild(cardBody);
          cardBody.appendChild(articletitle);
          cardBody.appendChild(articleSummary);
          cardBody.appendChild(linkButtonEl);
        }
      }
    })

    .catch();
  // comment from Jesus - append ticker data into div
  var currentSymbol = document.querySelector("#symbol");
  currentSymbol.textContent = `Symbol: ${search}`;

  // variable to include ALL stock info?
  var stockInfo = document.querySelector(".current-prices");

  localStorage.getItem(searchval, search);

  var ls = localStorage.getItem(search);
  ls.innerHTML = "";
};

// Create event listeners for the search
searchForm.addEventListener("submit", (e) => {
  e.preventDefault()
  stockTicker(ticker.value)
});

// Use a fetch call to gather information from the API
// use local storage to save watchlist stocks
const watchListButtons = document.getElementById('watch-list-buttons')
populateWatchlist()
function populateWatchlist() {
  // read watch-list from local storage
  const arrayFromStorage = JSON.parse(localStorage.getItem("watch-list"));

  if (arrayFromStorage) {
    // 
    watchListButtons.innerHTML = ''
    for (var i = 0; i < arrayFromStorage.length; i++) {
      const button = document.createElement('button')
      button.innerText = arrayFromStorage[i]
      button.addEventListener('click', (e) => {
        stockTicker(e.target.textContent)
      })
      watchListButtons.append(button)
    }
  }
}
