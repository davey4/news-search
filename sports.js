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
  let events = document.createElement("div");
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
    
    time.appendChild(description);
    event.appendChild(time);
    events.appendChild(event);
  });
  display.appendChild(events);
};
// getNflGames();


const getNflTeams = async() => {
  const LIST_ALL_NFL_TEAMS = `https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=${NFL_ID}`;
  try { 
    let response = await axios.get(LIST_ALL_NFL_TEAMS)
    fillNflDropdown(response.data.teams)
  } catch (error) {
    console.log(error)
  }
}

const fillNflDropdown = (data) =>{
  // console.log(data)
  let dropDownDiv = document.querySelector('#nfl-dropdown')
  let dropDown = document.createElement('select')
  dropDown.addEventListener('change', nflTeamPage)
  data.forEach((element) =>{
    let optionElement = document.createElement('option')
    optionElement.innerText = `${element.strTeam}`
    optionElement.setAttribute('value', element.idTeam)
    dropDown.appendChild(optionElement)
  })
  dropDownDiv.appendChild(dropDown)
}

const nflTeamPage = async(e) =>{
  let teamId = e.target.value
  const LOOK_UP_NFL_TEAM = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${teamId}`
  try {
    let response = await axios.get(LOOK_UP_NFL_TEAM)
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

window.onload = ()=>{
  getNflTeams()
  getNflGames()
}
