"use strict";

$("#searchCoinForm").submit(function(e) {
    e.preventDefault();
    let SEARCHED_COIN = $("#searchedCoin").val();
    console.log(SEARCHED_COIN);
});

const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=1000&offset=0",
    "method": "GET",
    "headers": {
        "X-RapidAPI-Key": "59ba742d48msh46feac59f2323b3p1be004jsn2f643a858b6e",
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com"
    }
};

$.ajax(settings)
    .done(function (data, status) {
        console.log(data);
        console.log(status);
        displayCoins(data);
        displayMarketCap(data);
        displayTotalCoins(data);
        display24hVolume(data);
        displayTotalExchanges(data);
    });

function displayCoins(data) {
    let html = "";
    for (let i = 0; i < 1000; i++) {

        let line = `<div class="card">`;
        line += `<img class="coinImage" src="${data.data.coins[i].iconUrl}" alt="coin"/>`;
        line += `<div class="cardInfo">`;
        line += `<h1>` + data.data.coins[i].name + `</h1>`;
        line += `<p>` + "Symbol: " + data.data.coins[i].symbol + `</p>`;
        line += `</div>`;
        line += `<h2 class="price">` + "Price: " + "$" + round(data.data.coins[i].price) + `</h2>`;
        line += `</div>`;
        html += line;
    }
    $('#displayedCoins').html(html);
}

function round(data) {
   return Math.round(data * 1000000) / 1000000;
}

function displayMarketCap(data) {
    let html = '<p>' + "$" + addCommas(data.data.stats.totalMarketCap) + '</p>';
    $('#totalMarketCap').html(html);
}

function displayTotalCoins(data) {
    let html = '<p>' + addCommas(data.data.stats.totalCoins) + '</p>';
    $('#totalCoins').html(html);
}

function display24hVolume(data) {
    let html = '<p>' + "$" + addCommas(data.data.stats.total24hVolume) + '</p>';
    $('#total24hVolume').html(html);
}

function displayTotalExchanges(data) {
    let html = '<p>' + data.data.stats.totalExchanges + '</p>';
    $('#totalExchanges').html(html);
}

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