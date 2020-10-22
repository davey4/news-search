$(".carousel").carousel({
  interval: 1500,
});

const FINHUB_API_KEY = "bu6qdbf48v6rghl7ibdg";
const carouselInner = document.querySelector(".carousel-inner");

const socket = new WebSocket("wss://ws.finnhub.io?token=bu6qdbf48v6rghl7ibdg");

const stockSearch = document.querySelector("#stock-search");
const stockBtn = document.querySelector("#stock-btn");
const stockPrice = document.querySelector(".stockPrice");
const companyInfo = document.querySelector('.companyInfo')
const main = document.querySelector("main");

class LiveTrades {
  constructor(symbol, lastPrice, timeStamp, volume) {
    this.symbol = symbol;
    this.price = lastPrice;
    this.time = timeStamp;
    this.volume = volume;
  }
  displayTrades() {
    let carouselItem = document.createElement("div");
    carouselItem.className = "carousel-item";

    let priceDiv = document.createElement("div");
    priceDiv.className = "d-block w-1000";

    let timeDiv = document.createElement("div");
    let volumeDiv = document.createElement("div");

    carouselItem.innerText = `Company: ${this.symbol}`;
    priceDiv.innerText = `Price: $${this.price}`;
    timeDiv.innerText = `Time Stamp: ${this.time}`;
    volumeDiv.innerText = `Volume: ${this.volume} shares`;

    carouselItem.appendChild(priceDiv);
    carouselItem.appendChild(timeDiv);
    carouselItem.appendChild(volumeDiv);
    carouselInner.appendChild(carouselItem);
  }
}

// Connection opened -> Subscribe
socket.addEventListener("open", function (event) {
  // socket.send(JSON.stringify({ type: "subscribe", symbol: 'APPL' }));
  stockSearch.addEventListener("change", function () {
    let search = stockSearch.value.toUpperCase();
    socket.send(JSON.stringify({ type: "subscribe", symbol: `${search}` }));
  });
});

// Listen for messages
socket.addEventListener("message", function (event) {
  let newEvent = JSON.parse(event.data);

  let trade = new LiveTrades(
    newEvent.data[0].s,
    newEvent.data[0].p,
    newEvent.data[0].t,
    newEvent.data[0].v
  );
  trade.displayTrades();
});

class Story {
  constructor(headline, summary, url) {
    this.headline = headline;
    this.summary = summary;
    this.url = url;
  }
  displayStory() {
    let url = this.url;
    let headlineDiv = document.createElement("div");
    headlineDiv.className = "story";

    let summaryDiv = document.createElement("div");

    headlineDiv.innerText = this.headline;
    headlineDiv.addEventListener("click", function () {
      window.open(`${url}`, "_blank");
    });

    summaryDiv.innerText = this.summary;

    headlineDiv.appendChild(summaryDiv);
    main.appendChild(headlineDiv);
  }
}

const getStories = async () => {
  const STORIES_URL = `https://finnhub.io/api/v1/news?category=general&token=${FINHUB_API_KEY}`;
  try {
    let response = await axios.get(STORIES_URL);
    displayStories(response.data);
  } catch (error) {
    console.log(error);
  }
};

const displayStories = (data) => {
  data.forEach((element) => {
    let stories = new Story(element.headline, element.summary, element.url);
    stories.displayStory();
  });
};

const searchStocks = async () => {
  let search = stockSearch.value;
  const PRICE_DATA_URL = `https://finnhub.io/api/v1/quote?symbol=${search}&token=${FINHUB_API_KEY}`;
  try {
    let response = await axios.get(PRICE_DATA_URL);
    priceData = response.data;
    let data = {
      symbol: search,
      currentPrice: priceData.c,
      openPrice: priceData.o,
      highPrice: priceData.h,
      lowPrice: priceData.l,
    };
    displayStocks(data);
  } catch (error) {
    console.log(error);
  }
};

const displayStocks = (data) => {
  let results = document.createElement("div");
  let resultHeader = document.createElement("h2");
  let currentPriceDisplay = document.createElement("h3");
  let openPriceDisplay = document.createElement("h3");
  let highPriceDisplay = document.createElement("h3");
  let lowPriceDisplay = document.createElement("h3");

  results.className = "stock-result";
  resultHeader.innerText = data.symbol.toUpperCase();
  currentPriceDisplay.innerText = `Current Price is: $${data.currentPrice}`;
  openPriceDisplay.innerText = `Opening Price: $${data.openPrice}`;
  highPriceDisplay.innerText = `High Price of the Day: $${data.highPrice}`;
  highPriceDisplay.style.color = "green";
  lowPriceDisplay.innerText = `Low Price of the Day: $${data.lowPrice}`;
  lowPriceDisplay.style.color = "red";

  results.appendChild(resultHeader);
  results.appendChild(currentPriceDisplay);
  results.appendChild(openPriceDisplay);
  results.appendChild(highPriceDisplay);
  results.appendChild(lowPriceDisplay);
  stockPrice.appendChild(results);
};

class Company {
  constructor(name, exchange, ipo, phone, weburl, logo){
    this.name = name
    this.exchange = exchange
    this.ipo = ipo
    this.phone = phone
    this.weburl = weburl
    this.logo = logo
  }
  displayComp(){
    let nameDiv = document.createElement('div')
    nameDiv.className = 'comp'

    let exchangeDiv = document.createElement('div')
    let ipoDiv = document.createElement('div')
    let phoneDiv = document.createElement('div')
    let weburlLink = document.createElement('a')
    weburlLink.setAttribute('href', this.weburl)

    let logo = this.logo
    nameDiv.style.backgroundImage = `url(${logo})`

    nameDiv.innerText = this.name
    exchangeDiv.innerText = `Exchange: ${this.exchange}`
    ipoDiv.innerText = `IPO: ${this.ipo}`
    phoneDiv.innerText = `Phone num: ${this.phone}`
    weburlLink.innerText = this.weburl

    nameDiv.appendChild(exchangeDiv)
    nameDiv.appendChild(ipoDiv)
    nameDiv.appendChild(phoneDiv)
    nameDiv.appendChild(weburlLink)
    companyInfo.appendChild(nameDiv)
  }
}




const getCompanyInfo = async() =>{
  let search = stockSearch.value.toUpperCase();
  const COMP_INFO_URL = `https://finnhub.io/api/v1/stock/profile2?symbol=${search}&token=${FINHUB_API_KEY}`
  try {
    let response = await axios.get(COMP_INFO_URL)
    displayCompInfo(response.data)
  } catch (error) {
    console.log(error)
  }
}

const displayCompInfo = (data) =>{
  removeElements(document.querySelectorAll('.comp'))
  let comp = new Company(data.name, data.exchange, data.ipo, data.phone, data.weburl, data.logo)
  comp.displayComp()
}




const companyFinancials = async () => {
  let search = stockSearch.value;
  const FINANCIALS_URL = `https://finnhub.io/api/v1/stock/metric?symbol=${search}&metric=all&token=${FINHUB_API_KEY}`;
  try {
    let response = await axios.get(FINANCIALS_URL);
    console.log(response.data)
  } catch (error) {
    console.log(error);
  }
};


const removeElements = (elms) => elms.forEach((el) => el.remove());

stockSearch.addEventListener("change", searchStocks);
stockSearch.addEventListener("change", getCompanyInfo);
stockSearch.addEventListener("change", companyFinancials);
stockBtn.addEventListener("click", function (e) {
  e.preventDefault();
});

window.onload = getStories