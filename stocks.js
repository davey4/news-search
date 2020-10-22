$(".carousel").carousel({
  interval: 1500,
});

const FINHUB_API_KEY = "bu6qdbf48v6rghl7ibdg";
const carouselInner = document.querySelector(".carousel-inner");

const socket = new WebSocket("wss://ws.finnhub.io?token=bu6qdbf48v6rghl7ibdg");

const stockSearch = document.querySelector("#stock-search");
const stockBtn = document.querySelector("#stock-btn");
const stockPrice = document.querySelector(".stockPrice");
const companyInfo = document.querySelector(".companyInfo");
const main = document.querySelector("#story");
const financialsMain = document.querySelector("#financials");
const yearlyFinancials = document.querySelector('#yearlyFinancials')

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
    volumeDiv.innerText = `Volume: ${this.volume}`;
    carouselItem.style.backgroundColor = "white";

    carouselItem.appendChild(priceDiv);
    carouselItem.appendChild(timeDiv);
    carouselItem.appendChild(volumeDiv);
    carouselInner.appendChild(carouselItem);
  }
}

socket.addEventListener("open", function (event) {
  stockSearch.addEventListener("change", function () {
    let search = stockSearch.value.toUpperCase();
    socket.send(JSON.stringify({ type: "subscribe", symbol: `${search}` }));
  });
});

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
  constructor(name, exchange, ipo, share, phone, weburl, logo) {
    this.name = name;
    this.exchange = exchange;
    this.ipo = ipo;
    this.share = share;
    this.phone = phone;
    this.weburl = weburl;
    this.logo = logo;
  }
  displayComp() {
    let nameDiv = document.createElement("div");
    nameDiv.className = "comp";

    let exchangeDiv = document.createElement("div");
    let ipoDiv = document.createElement("div");
    let shareDiv = document.createElement("div");
    let phoneDiv = document.createElement("div");
    let weburlLink = document.createElement("a");
    weburlLink.setAttribute("href", this.weburl);

    let logo = this.logo;
    nameDiv.style.backgroundImage = `url(${logo})`;
    nameDiv.style.backgroundColor = "white";

    nameDiv.innerText = this.name;
    exchangeDiv.innerText = `Exchange: ${this.exchange}`;
    ipoDiv.innerText = `IPO: ${this.ipo}`;
    shareDiv.innerText = `Outstanding shares : ${this.share}`;
    phoneDiv.innerText = `Phone num: ${this.phone}`;
    weburlLink.innerText = this.weburl;

    nameDiv.appendChild(exchangeDiv);
    nameDiv.appendChild(ipoDiv);
    nameDiv.appendChild(shareDiv);
    nameDiv.appendChild(phoneDiv);
    nameDiv.appendChild(weburlLink);
    companyInfo.appendChild(nameDiv);
  }
}

const getCompanyInfo = async () => {
  let search = stockSearch.value.toUpperCase();
  const COMP_INFO_URL = `https://finnhub.io/api/v1/stock/profile2?symbol=${search}&token=${FINHUB_API_KEY}`;
  try {
    let response = await axios.get(COMP_INFO_URL);
    displayCompInfo(response.data);
  } catch (error) {
    console.log(error);
  }
};

const displayCompInfo = (data) => {
  removeElements(document.querySelectorAll(".comp"));
  let comp = new Company(
    data.name,
    data.exchange,
    data.ipo,
    data.shareOutstanding,
    data.phone,
    data.weburl,
    data.logo
  );
  comp.displayComp();
};

const companyFinancials = async () => {
  let search = stockSearch.value;
  const FINANCIALS_URL = `https://finnhub.io/api/v1/stock/metric?symbol=${search}&metric=all&token=${FINHUB_API_KEY}`;
  try {
    let response = await axios.get(FINANCIALS_URL);
    displayMetric(response.data.metric);
    displayCompYearlyFinancials(response.data.series.annual);
  } catch (error) {
    console.log(error);
  }
};

class Metric {
  constructor(title, value) {
    this.title = title;
    this.value = value;
  }
  diplayMet() {
    let titleDiv = document.createElement("div");
    titleDiv.className = "financials";
    let vDiv = document.createElement("div");

    titleDiv.innerText = `${this.title}:`;
    vDiv.innerText = this.value;
    if (this.value > 0) {
      titleDiv.style.backgroundColor = "green";
    } else if(this.value < 0) {
      titleDiv.style.backgroundColor = "red";
    }

    titleDiv.appendChild(vDiv);
    financialsMain.appendChild(titleDiv);
  }
}

const displayMetric = (data) => {
  removeElements(document.querySelectorAll(".story"));
  removeElements(document.querySelectorAll(".financials"));
  removeElements(document.querySelectorAll('.yearlyFinancials'))
  console.log(data);
  for (const key in data) {
    let metrics = new Metric(key, `${data[key]}`);
    metrics.diplayMet();
  }
};

class Financials {
  constructor(title, period, v) {
    this.title = title;
    this.period = period;
    this.v = v;
  }
  displayFinancials() {
    let titleDiv = document.createElement("div");
    titleDiv.className = "yearlyFinancials";
    let periodDiv = document.createElement("div");
    let vDiv = document.createElement("div");

    titleDiv.innerText = this.title;
    periodDiv.innerText = `Period: ${this.period}`;
    vDiv.innerText = `Volume :${this.v}`;
    if (this.v > 0) {
      titleDiv.style.backgroundColor = "green";
    } else {
      titleDiv.style.backgroundColor = "red";
    }

    titleDiv.appendChild(periodDiv);
    titleDiv.appendChild(vDiv);
    yearlyFinancials.appendChild(titleDiv);
  }
}

const displayCompYearlyFinancials = (data) => {
  let yearly = document.createElement("div");
  yearly.className = "yearlyFinancials";
  yearly.innerText = "Yearly Financial's";
  yearlyFinancials.appendChild(yearly);

  let currRatio = data.currentRatio;
  let grossMargin = data.grossMargin;
  let netMargin = data.netMargin;
  let pretaxMargin = data.pretaxMargin;
  let salesPerShare = data.salesPerShare;
  let totalRatio = data.totalRatio;

  currRatio.forEach((element) => {
    let curr = new Financials("Current Ratio", element.period, element.v);
    curr.displayFinancials();
  });
  grossMargin.forEach((element) => {
    let gross = new Financials("Gross Margin", element.period, element.v);
    gross.displayFinancials();
  });
  netMargin.forEach((element) => {
    let net = new Financials("Net Margin", element.period, element.v);
    net.displayFinancials();
  });
  pretaxMargin.forEach((element) => {
    let pre = new Financials("Pre Tax Margin", element.period, element.v);
    pre.displayFinancials();
  });
  salesPerShare.forEach((element) => {
    let sales = new Financials("Sales Per Share", element.period, element.v);
    sales.displayFinancials();
  });
  totalRatio.forEach((element) => {
    let tot = new Financials("Total Ratio", element.period, element.v);
    tot.displayFinancials();
  });
};

const removeElements = (elms) => elms.forEach((el) => el.remove());

stockSearch.addEventListener("change", searchStocks);
stockSearch.addEventListener("change", getCompanyInfo);
stockSearch.addEventListener("change", companyFinancials);
stockBtn.addEventListener("click", function (e) {
  e.preventDefault();
});

window.onload = getStories;
