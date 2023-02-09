// Create variable for news API/ alphavantage
var newsApiKey = "Y05JOHE1Z7ATCKW7"
// Create variables for ticker and price API/ Finhub
var tickerApiKey = "cfe7pg9r01qp08kufpagcfe7pg9r01qp08kufpb0"
var priceApiKey = "cfe7pg9r01qp08kufpagcfe7pg9r01qp08kufpb0"

var searchStock = document.querySelector ("#searchStocks");

var ticker = document.querySelector('#search-input');

var searchForm = document.querySelector('#search-button');

// Create a function to pull data from search button using the API ***USE ACT 24***
let stockTicker = function(event) {
    event.preventDefault();
    let search=ticker.value;
        if (search){
            console.log();
        }
    
    console.log(search)
}

// Gets Price Data for Stocks
fetch (
    `https://finnhub.io/api/v1/quote?symbol=${search}&token=${priceApiKey}`
    )
    .then (function(response) {
        return response.json();
    })
    .then(function (data){
        console.log ('first stock', data)
        getStock(data);
    })
    .catch();

// Pulls News data for stock ticker
fetch (
    `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${search}&apikey=${newsApiKey}`
    )
    
    .then (function(response) {
        return response.json();
    })
    .then(function (data){
        console.log ('first stock', data)
        getStock(data);
    })
    .catch();
}

// Create event listeners for the search
searchForm.addEventListener("click", stockTicker)


// Use a fetch call to gather information from the API
// use local storage to save watchlist stocks 

// Create a function for populating news articles 
// Create a button that takes you to news articles
