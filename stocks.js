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
  // const form = document.querySelector("form");

  const searchStocks = async () => {
    let search = stockSearch.value;
    const PRICE_DATA_URL = `https://finnhub.io/api/v1/quote?symbol=${search}&token=${FINHUB_API_KEY}`;
    try {
      let response = await axios.get(PRICE_DATA_URL);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

    stockSearch.addEventListener("change", searchStocks);
    stockBtn.addEventListener("click", function (e) {
  e.preventDefault();
    });
});
