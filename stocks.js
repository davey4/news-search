document.addEventListener("DOMContentLoaded", function () {
  $(".carousel").carousel({
    interval: 4000,
  });

  const FINHUB_API_KEY = "bu6qdbf48v6rghl7ibdg";
  const carouselInner = document.querySelector(".carousel-inner");

  class Story {
    constructor(headline, summary, url) {
      this.headline = headline;
      this.summary = summary;
      this.url = url;
    }
    displayStory() {
        let url = this.url
      let carouselItem = document.createElement("div");
      carouselItem.className = "carousel-item";

      let summaryDiv = document.createElement("div");
      summaryDiv.className = "d-block w-1000";

      carouselItem.innerText = this.headline;
      carouselItem.addEventListener("click", function () {
        window.open(`${url}`, "_blank");
      });

      
      summaryDiv.innerText = this.summary;

      carouselItem.appendChild(summaryDiv);
      carouselInner.appendChild(carouselItem);
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
  getStories();

  const displayStories = (data) => {
    data.forEach((element) => {
      let stories = new Story(
        element.headline,
        element.summary,
        element.url
      );
      stories.displayStory();
    });
  };

  const stockSearch = document.querySelector("#stock-search");
  const stockBtn = document.querySelector("#stock-btn");
  const aside = document.querySelector("aside");

  const searchStocks = async () => {
    let search = stockSearch.value;
    const PRICE_DATA_URL = `https://finnhub.io/api/v1/quote?symbol=${search}&token=${FINHUB_API_KEY}`;
    try {
      let response = await axios.get(PRICE_DATA_URL);
      priceData = response.data
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
    aside.appendChild(results);
  };

  const companyFinancials = async()=>{
    let search = stockSearch.value;
    const FINANCIALS_URL =`https://finnhub.io/api/v1/stock/metric?symbol=${search}&metric=all&token=${FINHUB_API_KEY}`
    try {
      let response = await axios.get(FINANCIALS_URL)
      console.log(response.data.series.annual)
    } catch (error) {
      console.log(error)
    }
  }


    stockSearch.addEventListener("change", searchStocks);
    stockSearch.addEventListener('change', companyFinancials)
    stockBtn.addEventListener("click", function (e) {
  e.preventDefault();
    });
});
