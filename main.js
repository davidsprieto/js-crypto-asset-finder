const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0",
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
    displayMarketCap(data);
    displayTotalCoins(data);
    display24hVolume(data);
    displayTotalExchanges(data);
});

function displayMarketCap(data) {
    let html = '<p>' + data.data.stats.totalMarketCap + '</p>';
    $('#totalMarketCap').html(html);
}

function displayTotalCoins(data) {
    let html = '<p>' + data.data.stats.totalCoins + '</p>';
    $('#totalCoins').html(html);
}

function display24hVolume(data) {
    let html = '<p>' + data.data.stats.total24hVolume + '</p>';
    $('#total24hVolume').html(html);
}

function displayTotalExchanges(data) {
    let html = '<p>' + data.data.stats.totalExchanges + '</p>';
    $('#totalExchanges').html(html);
}