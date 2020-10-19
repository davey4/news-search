const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
const API_KEY = "2c6mghqgmr869vnmhv738tpk";
const URL = `${PROXY_URL}http://api.sportradar.us/nfl/official/trial/v6/en/seasons/2020/standings.json?api_key=${API_KEY}`;

const getStandings = async () => {
  try {
    let response = await axios.get(URL);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
// getStandings();

// const NFL_ID = "4391";
// const NBA_ID = "4387";
// const URL_ALL_LEAGES =
//   "https://www.thesportsdb.com/api/v1/json/1/all_leagues.php";
// const URL_LOOKUP_LEAGUE = `https://www.thesportsdb.com/api/v1/json/1/lookupleague.php?id=${NFL_ID}`;
// const URL_LOOKUP_EVENTS = `https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=${NFL_ID}`;
// // const LIST_ALL_TEAMS = `https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=American%20Footbal`

// const getNfl = async () => {
//   try {
//     let response = await axios.get(URL_LOOKUP_EVENTS);
//     listGames(response.data.events);
//   } catch (error) {
//     console.log(error);
//   }
// };

// const listGames = (data) => {
//   let body = document.querySelector("body");
//   let events = document.createElement("div");
//   data.forEach((element) => {
//     let event = document.createElement("div");
//     // event.style.backgroundImage = `url(${event.strThumb})`;
//     event.innerText = element.strEvent;
//     console.log(element);
//     events.appendChild(event);
//   });
//   body.appendChild(events);
// };
// getNfl();
// strThumb