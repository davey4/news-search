const NFL_ID = "4391";
const NBA_ID = "4387";
const URL_ALL_LEAGES =
  "https://www.thesportsdb.com/api/v1/json/1/all_leagues.php";
const URL_LOOKUP_LEAGUE = `https://www.thesportsdb.com/api/v1/json/1/lookupleague.php?id=${NFL_ID}`;

const getNflGames = async () => {
  const URL_LOOKUP_NFL_EVENTS = `https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=${NFL_ID}`;
  try {
    let response = await axios.get(URL_LOOKUP_NFL_EVENTS);
    listNflGames(response.data.events);
    // console.log(response.data.events)
  } catch (error) {
    console.log(error);
  }
};

const listNflGames = (data) => {
  let display = document.querySelector("#nfl-event-display");
  removeElements(document.querySelectorAll(".teamDisplay"));
  removeElements(document.querySelectorAll('.teamSched'))
  let events = document.createElement("div");
  events.className = "events";
  events.innerText = "Upcoming NFL Games";
  data.forEach((element) => {
    let event = document.createElement("div");
    let time = document.createElement("div");
    let description = document.createElement("div");
    description.className = "description";
    event.className = "nflEvent";
    event.style.backgroundImage = `url(${element.strThumb})`;

    event.innerText = element.strEvent;
    time.innerText = `Date: ${element.dateEvent} Kickoff: ${element.strTime}`;
    description.innerText = element.strDescriptionEN;

    event.appendChild(time);
    event.appendChild(description);
    events.appendChild(event);
  });
  display.appendChild(events);
};
// getNflGames();

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
  let dropDownDiv = document.querySelector("#nfl-dropdown");
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
  removeElements(document.querySelectorAll(".events"));
  let display = document.querySelector("#nfl-team-info");
  removeElements(document.querySelectorAll(".teamDisplay"));
  let teamDisplay = document.createElement("div");
  teamDisplay.className = "teamDisplay";
  let banner = data[0].strTeamBanner;

  teamDisplay.style.backgroundImage = `url(${banner})`;

  display.appendChild(teamDisplay);
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
  console.log(data);
  let display = document.querySelector("#nfl-team-info");
  removeElements(document.querySelectorAll('.teamSched'))
  let teamSched = document.createElement('div')
  teamSched.className = 'teamSched'
    data.forEach((element) =>{
    let event = document.createElement("div");
    let time = document.createElement("div");
    let description = document.createElement("div");
    description.className = "description";
    event.className = "nflEvent";
    event.style.backgroundImage = `url(${element.strThumb})`;

    event.innerText = element.strEvent;
    time.innerText = `Date: ${element.dateEvent} Kickoff: ${element.strTime}`;
    description.innerText = element.strDescriptionEN;

    event.appendChild(time);
    event.appendChild(description);
    teamSched.appendChild(event);
  })
  display.appendChild(teamSched)
};

const removeElements = (elms) => elms.forEach((el) => el.remove());

const upcomingGames = document.querySelector("#upcoming-games");
upcomingGames.addEventListener("click", getNflGames);

window.onload = () => {
  getNflTeams();
  getNflGames();
};
