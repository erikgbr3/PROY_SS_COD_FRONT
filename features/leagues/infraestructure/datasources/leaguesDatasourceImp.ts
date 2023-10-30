import leaguesDatasource from "../../domain/datasources/leaguesDatasource";
import AddLeaguesResult from "../../domain/entities/addLeagueResult";
import League from "../../domain/entities/league";
import LeaguesResult from "../../domain/entities/leaguesResult";

class leaguesDatasourceImp extends leaguesDatasource{
  async getLeagues(): Promise<LeaguesResult> {
    return fetch('http://192.168.1.74:3000/api/leagues')
    .then((response) => response.json())
    .then((response) => {
      const leagues = response.map((item:any) =>new League(
        item.name,
        item.cost,
        item.prize,
        item.init, 
        item.description, 
        item.ownerId,
        item.id,
      ))
      return new LeaguesResult(
        leagues
      )
    })
  } 
  async addLeague(league: League): Promise<AddLeaguesResult> {
    console.log(league);
    return fetch('http://192.168.1.74:3000/api/leagues', {
      method: 'POST',
      body: JSON.stringify(league),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((response) =>{
      console.log('Result', response);      
      const result = new AddLeaguesResult(response.message, response.league || null);
      result.errors = response.errors || null;
      result.error = response.error || null;

      return result;
    })
    
  }
  
}

export default leaguesDatasourceImp