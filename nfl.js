const NFL_ID = "4391";
const NBA_ID = "4387";
const URL_ALL_LEAGES =
  "https://www.thesportsdb.com/api/v1/json/1/all_leagues.php";
const URL_LOOKUP_LEAGUE = `https://www.thesportsdb.com/api/v1/json/1/lookupleague.php?id=${NFL_ID}`;

const section = document.querySelector("section");
const main = document.querySelector("main");

class Game {
  constructor(event, date, time, description, pic) {
    this.event = event;
    this.date = date;
    this.time = time;
    this.description = description;
    this.pic = pic;
  }
  displayGames() {
    let pic = this.pic;
    let events = document.createElement("div");
    let event = document.createElement("div");
    let time = document.createElement("div");
    let description = document.createElement("div");
    description.className = "description";
    event.className = "nflEvent";
    event.style.backgroundImage = `url(${pic})`;

    event.innerText = this.event;
    time.innerText = `Date: ${this.date} Kickoff: ${this.time}`;
    description.innerText = this.description;

    event.appendChild(time);
    event.appendChild(description);
    events.appendChild(event);
    section.appendChild(events);
  }
}

const getNflGames = async () => {
  const URL_LOOKUP_NFL_EVENTS = `https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=${NFL_ID}`;
  try {
    let response = await axios.get(URL_LOOKUP_NFL_EVENTS);
    listNflGames(response.data.events);
  } catch (error) {
    console.log(error);
  }
};

const listNflGames = (data) => {
  removeElements(document.querySelectorAll(".banner"));
  removeElements(document.querySelectorAll(".nflEvent"));
  let teamDisplay = document.createElement("div");
  teamDisplay.className = "banner";

  teamDisplay.style.backgroundImage = `url(https://wallpapercave.com/wp/heeVWtl.jpg)`;

  main.appendChild(teamDisplay);

  data.forEach((element) => {
    let games = new Game(
      element.strEvent,
      element.dateEvent,
      element.strTime,
      element.strDescriptionEN,
      element.strThumb
    );
    games.displayGames();
  });
};

const getNflTeams = async () => {
  const LIST_ALL_NFL_TEAMS = `https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=${NFL_ID}`;
  try {
    let response = await axios.get(LIST_ALL_NFL_TEAMS);
    fillNflDropdown(response.data.teams);
  } catch (error) {
    console.log(error);
  }
};

const fillNflDropdown = (data) => {
  let dropDownDiv = document.querySelector("#dropdown");
  let dropDown = document.createElement("select");
  dropDown.addEventListener("change", nflTeamPage);
  dropDown.addEventListener("change", getTeamSched);
  data.forEach((element) => {
    let optionElement = document.createElement("option");
    optionElement.innerText = `${element.strTeam}`;
    optionElement.setAttribute("value", element.idTeam);
    dropDown.appendChild(optionElement);
  });
  dropDownDiv.appendChild(dropDown);
};

const nflTeamPage = async (e) => {
  let teamId = e.target.value;
  const LOOK_UP_NFL_TEAM = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${teamId}`;
  try {
    let response = await axios.get(LOOK_UP_NFL_TEAM);
    displayTeamInfo(response.data.teams);
  } catch (error) {
    console.log(error);
  }
};

const displayTeamInfo = (data) => {
  removeElements(document.querySelectorAll(".nflEvent"));
  removeElements(document.querySelectorAll(".banner"));
  let teamDisplay = document.createElement("div");
  teamDisplay.className = "banner";
  let banner = data[0].strTeamBanner;

  teamDisplay.style.backgroundImage = `url(${banner})`;

  main.appendChild(teamDisplay);
};

const getTeamSched = async (e) => {
  let teamId = e.target.value;
  const LOOK_UP_TEAM_SCHEDULE = `https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=${teamId}`;
  try {
    let response = await axios.get(LOOK_UP_TEAM_SCHEDULE);
    displayTeamSched(response.data.events);
  } catch (error) {
    console.log(error);
  }
};

const displayTeamSched = (data) => {
  data.forEach((element) => {
    let games = new Game(
      element.strEvent,
      element.dateEvent,
      element.strTime,
      element.strDescriptionEN,
      element.strThumb
    );
    games.displayGames();
  });
};

const removeElements = (elms) => elms.forEach((el) => el.remove());

const upcomingGames = document.querySelector("#upcoming-games");
upcomingGames.addEventListener("click", getNflGames);

window.onload = () => {
  getNflTeams();
  getNflGames();
};
