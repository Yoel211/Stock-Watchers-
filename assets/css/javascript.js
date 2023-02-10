// Create variable for news API/ alphavantage
var newsApiKey = "Y05JOHE1Z7ATCKW7";
// Create variables for ticker and price API/ Finhub
var tickerApiKey = "cfe7pg9r01qp08kufpagcfe7pg9r01qp08kufpb0";
var priceApiKey = "cfe7pg9r01qp08kufpagcfe7pg9r01qp08kufpb0";
var searchForm = document.querySelector("#search-form");
var searchStock = document.querySelector("#searchStocks");

var searchStock = document.querySelector("#searchStocks");

var ticker = document.querySelector("#search-input");

var searchForm = document.querySelector("#search-button");

// Create a function to pull data from search button using the API ***USE ACT 24***
let stockTicker = function (event) {
    event.preventDefault();
    let search = ticker.value;
    if (search) {
        console.log();
    }

    console.log(search)

    // Stock Name Data for stocks
    fetch(
        `https://finnhub.io/api/v1/search?q=${search}&token=${tickerApiKey}`
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('first stock', data)
            //getStock(data);
        })
        .catch();

    // Gets Price Data for Stocks
    fetch(
        `https://finnhub.io/api/v1/quote?symbol=${search}&token=${priceApiKey}`
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('stock price', data)
            // getStock(data);
            console.log(data.c);
            // Dan says this needs to be in the scope, so I moved it here! 
            var currentPrice = document.querySelector("#currentP");
            currentPrice.textContent = `Current Price: ${data.c}`;

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
            console.log('stock news', data)
            //getStock(data);
        })
        .catch();

    console.log(data[0]);
    // comment from Jesus - append ticker data into div
    var currentSymbol = document.querySelector("#symbol");
    currentSymbol.textContent = `Symbol: ${search}`;



    var highP = document.querySelector("#highP");
    highP.textContent = `High Price: ${search.stockprice}`;

    var lowP = document.querySelector("#lowP");
    lowP.textContent = `Low Price: ${search.stockprice}`;

    var openP = document.querySelector("#openP");
    openP.textContent = `Open Price: ${search.stockprice}`;

    var prevClose = document.querySelector("#prevClose");
    prevClose.textContent = `Previous Close: ${search.stockprice}`;

    // variable to include ALL stock info?    
    var stockInfo = document.querySelector(".current-prices");

    // function to render ALL current stock info 
    /* function renderCurrent(weather) {
        console.log(weather);
        cityName.textContent = weather.city.name;
        dateEl.textContent = `${weather.list[0].dt_txt}`;
      
        condEl.setAttribute("src", `http://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}.png`);
        tempEl.textContent = `Temp: ${weather.list[0].main.temp}°F`;
        windEl.textContent = `Wind: ${weather.list[0].wind.speed} MPH`;
        humidEl.textContent = `Humidity: ${weather.list[0].main.humidity}%`;
      } */
}

// Create event listeners for the search
searchForm.addEventListener("click", stockTicker);

// Use a fetch call to gather information from the API
// use local storage to save watchlist stocks

// Create a function for populating news articles
// Create a button that takes you to news articles

