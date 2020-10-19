const API_KEY = "0Xr4c1QhU1qt2uuNkSzORhCZlhyICFFe";
const searchBar = document.querySelector("#search-bar");
const searchBtn = document.querySelector("#search-btn");
const section = document.querySelector("section");

const getMostPop = async () => {
  const URl_MOST_POP = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${API_KEY}`;
  try {
    let response = await axios.get(URl_MOST_POP);
    displayMostPop(response.data.results);
  } catch (error) {
    console.log(error);
  }
};

const displayMostPop = (data) => {
  removeElements(document.querySelectorAll(".top"));
  removeElements(document.querySelectorAll(".most-pop"));
  removeElements(document.querySelectorAll(".search"));
  let mostPopDiv = document.createElement("div");
  mostPopDiv.className = "most-pop";
  // mostPopDiv.innerText = "Most Popular Stories";

  data.forEach((element) => {
    // console.log(element.media.caption);
    let title = document.createElement("div");
    title.className = "popStory";
    title.innerText = element.title;
    title.setAttribute("href", element.url);
    // title.style.backgroundImage = `url(${element.multimedia[0].url})`
    title.addEventListener("click", function () {
      window.open(`${element.url}`, "_blank");
    });

    let abstract = document.createElement("div");
    abstract.className = "description";
    abstract.innerText = element.abstract;

    title.appendChild(abstract);
    mostPopDiv.appendChild(title);
  });
  section.appendChild(mostPopDiv);
};

const getTopStories = async () => {
  const URL_TOP_STORIES = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${API_KEY}`;
  try {
    let response = await axios.get(URL_TOP_STORIES);
    displayTopStories(response.data.results);
  } catch (error) {
    console.log(error);
  }
};

const displayTopStories = (data) => {
  removeElements(document.querySelectorAll(".most-pop"));
  removeElements(document.querySelectorAll(".top"));
  removeElements(document.querySelectorAll(".search"));
  let topDiv = document.createElement("div");
  topDiv.className = "top";
  // topDiv.innerText = "Top Stories";

  data.forEach((element) => {
    let title = document.createElement("div");
    title.className = "topStory";
    title.innerText = element.title;
    title.setAttribute("href", element.url);
    title.style.backgroundImage = `url(${element.multimedia[4].url})`;
    title.addEventListener("click", function () {
      window.open(`${element.url}`, "_blank");
    });

    let abstract = document.createElement("div");
    abstract.className = "description";
    abstract.innerText = element.abstract;

    title.appendChild(abstract);
    topDiv.appendChild(title);
  });
  section.appendChild(topDiv);
};

const searchStories = async () => {
  let search = searchBar.value;
  const SEARCH_URL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${search}&api-key=${API_KEY}`;
  try {
    let response = await axios.get(SEARCH_URL);
    displaySearch(response.data.response.docs, search);
  } catch (error) {
    console.log(error);
  }
};

const displaySearch = (data, search) => {
  removeElements(document.querySelectorAll(".most-pop"));
  removeElements(document.querySelectorAll(".top"));
  removeElements(document.querySelectorAll(".search"));
  let searchDiv = document.createElement("div");
  searchDiv.className = "search";
  searchDiv.innerText = `Showing Search Results for ${search}`;

  data.forEach((element) => {
    let title = document.createElement("div");
    title.className = "searchedStory";
    title.innerText = element.headline.main;
    // title.style.backgroundImage = `url(${element.multimedia[0].url})`;
    title.setAttribute("href", element.web_url);
    title.addEventListener("click", function () {
      window.open(`${element.web_url}`, "_blank");
    });
    let abstract = document.createElement("div");
    abstract.className = "description";
    abstract.innerText = element.abstract;

    title.appendChild(abstract);
    searchDiv.appendChild(title);
  });
  section.appendChild(searchDiv);
};

const removeElements = (elms) => elms.forEach((el) => el.remove());

searchBar.addEventListener("change", searchStories);
searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
});
const mostPopClick = document.querySelector("#most-pop-click");
mostPopClick.addEventListener("click", getMostPop);
const clickTop = document.querySelector("#top-click");
clickTop.addEventListener("click", getTopStories);

FINHUB_API_KEY = "bu6qdbf48v6rghl7ibdg";

const stockSearch = document.querySelector("#stock-search");
const stockBtn = document.querySelector("#stock-btn");
const aside = document.querySelector('aside')

const searchStocks = async() =>{
  let search = stockSearch.value
  const PRICE_DATA_URL = `https://finnhub.io/api/v1/quote?symbol=${search}&token=${FINHUB_API_KEY}`
  try {
    const response = await axios.get(PRICE_DATA_URL);
    let priceData = response.data;
    let data = {
      symbol: search,
      currentPrice: priceData.c,
      openPrice: priceData.o,
      highPrice: priceData.h,
      lowPrice: priceData.l,
    };
    displayStocks(data);
  } catch (error) {
    console.log(error)
  }
}

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
  highPriceDisplay.style.color = 'green'
  lowPriceDisplay.innerText = `Low Price of the Day: $${data.lowPrice}`;
  lowPriceDisplay.style.color = 'red'

  results.appendChild(resultHeader);
  results.appendChild(currentPriceDisplay);
  results.appendChild(openPriceDisplay);
  results.appendChild(highPriceDisplay);
  results.appendChild(lowPriceDisplay);
  aside.appendChild(results);
}


stockSearch.addEventListener("change", searchStocks);
stockBtn.addEventListener("click", function (e) {
  e.preventDefault();
});

window.onload = getTopStories;

