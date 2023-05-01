"use strict"

// Settings to be passed into ajax request.
const settings = {
    "async": false,
    "crossDomain": true,
    "url": "https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=501&offset=0",
    "method": "GET",
    "headers": {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com"
    }
};

// Ajax request to Coinranking API.
$.ajax(settings)
    .done(function (data) {
        // console.log(data);
        passData(data);
        displayCoins(data);
        displayMarketCap(data);
        displayTotalCoins(data);
        display24hVolume(data);
        displayTotalExchanges(data);
    }).fail(function () {
    console.log("Request to Coinranking API Failed.");
}).always(function () {
    console.log("Not your keys, not your crypto.");
});

// Function displays the data received from the Coinranking API.
function displayCoins(data) {
    let html = "";
    for (let i = 0; i <= 500; i++) {

        let name = data.data.coins[i].name;
        let symbol = data.data.coins[i].symbol;
        let iconUrl = data.data.coins[i].iconUrl;
        let price = round(data.data.coins[i].price);
        let link = data.data.coins[i].coinrankingUrl;
        let rank = data.data.coins[i].rank;
        let color = data.data.coins[i].color;

        let line = `<div class="card">`;
        line += `<img class="coinImage" src="${iconUrl}" alt="coin"/>`;
        line += `<div class="cardInfo">`;
        line += `<h5 class="rank">` + "#" + `${rank}` + `</h5>`;
        line += `<h1 class="coin"><a style="color: ${color};" href="${link}" target="_blank">` + `${name}` + `</a></h1>`;
        line += `<p class="symbol" style="color: ${color};">` + `${symbol}` + `</p>`;
        line += `</div>`;
        line += `<h2 class="price" style="color: ${color};">` + "Price: " + "$" + `${price}` + `</h2>`;
        line += `</div>`;
        html += line;
    }
    $('#displayedCoins').html(html);
}

// Function receives user input (searching for a crypto asset) from form on submit then passes that user input to a function to display if the user input matches a crypto asset from the Coinranking data.
function passData(data) {
    $(function () {
        $("#searchCoinForm").submit(function (e) {
            e.preventDefault(); // don't want to reload the page
            let coin = $("#searchedCoin").val().toLowerCase().trim();
            displaySearchedCoins(data, coin);
        });
    });
}

// Function displays the crypto asset searched for by user input.
function displaySearchedCoins(data, coin) {

    // If form is submitted with an empty string, display all crypto assets.
    if (coin === "") {
        displayCoins(data);
    } else {

        let found = false;
        let html = "";
        let name = "";
        let symbol = "";
        let rank = "";

        // Meet conditions to determine if the crypto asset exists/is found.
        for (let i = 0; i < 1000; i++) {
            name = data.data.coins[i].name.toLowerCase();
            symbol = data.data.coins[i].symbol.toLowerCase();
            rank = data.data.coins[i].rank.toString().toLowerCase();

            let nameMatch = (coin === name || name.includes(coin));
            let symbolMatch = (coin === symbol || symbol.includes(coin));
            let rankMatch = (coin === rank || rank.includes(coin));

            if (nameMatch || symbolMatch || rankMatch) {
                data = data.data.coins[i];
                found = true;
                break;
            }
        }

        // If the crypto asset is found, display its data.
        if (found) {
            let name = data.name;
            let symbol = data.symbol;
            let iconUrl = data.iconUrl;
            let price = round(data.price);
            let link = data.coinrankingUrl;
            let rank = data.rank;
            let color = data.color;

            let line = `<div class="card">`;
            line += `<img class="coinImage" src="${iconUrl}" alt="coin"/>`;
            line += `<div class="cardInfo">`;
            line += `<h6 class="rank">` + "#" + `${rank}` + `</h6>`;
            line += `<h1 class="coin"><a style="color: ${color};" href="${link}" target="_blank">` + `${name}` + `</a></h1>`;
            line += `<p class="symbol" style="color: ${color};">` + "Symbol: " + `${symbol}` + `</p>`;
            line += `</div>`;
            line += `<h2 class="price" style="color: ${color};">` + "Price: " + "$" + `${price}` + `</h2>`;
            line += `</div>`;
            html += line;
            $('#displayedCoins').html(html);
        } else {
            alert("Could not find that crypto asset.");
            displayCoins(data);
        }
    }
}

// Function rounds the Coinranking data to two decimal places.
function round(data) {
   return Math.round(data * 100) / 100;
}

// Function displays the market cap data from the Coinranking data.
function displayMarketCap(data) {
    let html = '<p>' + "$" + addCommas(data.data.stats.totalMarketCap) + '</p>';
    $('#totalMarketCap').html(html);
}

// Function displays the total amount of crypto assets data from the Coinranking data.
function displayTotalCoins(data) {
    let html = '<p>' + addCommas(data.data.stats.totalCoins) + '</p>';
    $('#totalCoins').html(html);
}

// Function displays the total 24 hour volume data from the Coinranking data.
function display24hVolume(data) {
    let html = '<p>' + "$" + addCommas(data.data.stats.total24hVolume) + '</p>';
    $('#total24hVolume').html(html);
}

// Function displays the total amount of crypto exchanges data from the Coinranking data.
function displayTotalExchanges(data) {
    let html = '<p>' + addCommas(data.data.stats.totalExchanges) + '</p>';
    $('#totalExchanges').html(html);
}

// Function formats the numbers received from the Coinranking data with commas to look better and for better readability.
function addCommas(data) {
    data = data.toString();
    let copy = "";
    let count = 0;
    for (let i = data.length - 1; i >= 0; i--) {
        count++;
        if ((count === 3) && (i !== 0)) {
            copy += data.charAt(i) + ",";
            count = 0;
        } else {
            copy += data.charAt(i);
        }
    }
    return copy.split("").reverse().join("");
}
