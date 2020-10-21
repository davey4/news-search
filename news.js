const API_KEY = "0Xr4c1QhU1qt2uuNkSzORhCZlhyICFFe";
const searchBar = document.querySelector("#search-bar");
const searchBtn = document.querySelector("#search-btn");
const section = document.querySelector("section");

class Article {
  constructor(title, story, url) {
    this.title = title;
    this.story = story;
    this.url = url;
  }
  displayArticles() {
    let url = this.url;
    let articleDiv = document.createElement("div");
    articleDiv.className = "article";
    let title = document.createElement("div");
    title.className = "articleTitle";
    title.innerText = this.title;
    title.setAttribute("href", this.url);
    title.addEventListener("click", function () {
      window.open(`${url}`, "_blank");
    });
    let abstract = document.createElement("div");
    abstract.className = "description";
    abstract.innerText = this.story;

    title.appendChild(abstract);
    articleDiv.appendChild(title);
    section.appendChild(articleDiv);
  }
}

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
  removeElements(document.querySelectorAll(".article"));
  removeElements(document.querySelectorAll(".search"));
  let mostPopDiv = document.createElement("div");
  mostPopDiv.className = "search";
  mostPopDiv.innerText = "Most Popular Stories";
  section.appendChild(mostPopDiv);
  data.forEach((element) => {
    let story = new Article(element.title, element.abstract, element.url);
    story.displayArticles();
  });
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
  removeElements(document.querySelectorAll(".article"));
  removeElements(document.querySelectorAll(".search"));
  let searchDiv = document.createElement("div");
  searchDiv.className = "search";
  searchDiv.innerText = "Top Stories";
  section.appendChild(searchDiv);
  data.forEach((element) => {
    let story = new Article(element.title, element.abstract, element.url);
    story.displayArticles();
  });
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
  removeElements(document.querySelectorAll(".article"));
  removeElements(document.querySelectorAll(".search"));
  let searchDiv = document.createElement("div");
  searchDiv.className = "search";
  searchDiv.innerText = `Showing Search Results for ${search}`;
  section.appendChild(searchDiv);
  data.forEach((element) => {
    let story = new Article(
      element.headline.main,
      element.abstract,
      element.web_url
    );
    story.displayArticles();
  });
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


window.onload = getTopStories;
