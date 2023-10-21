import leaguesDatasource from "../../domain/datasources/leaguesDatasource";
import League from "../../domain/entities/league";
import LeaguesResult from "../../domain/entities/leaguesResult";

class leaguesDatasourceImp extends leaguesDatasource{
  async getLeagues(): Promise<LeaguesResult> {
    return fetch('http://192.168.43.107:3000/api/leagues')
    .then((response) => response.json())
    .then((response) => {
      const leagues = response.map((item:any) =>new League(
        item.id,
        item.name,
        item.cost,
        item.prize,
        item.init, 
        item.description, 
        item.ownerId
      ))
      return new LeaguesResult(
        leagues
      )
    })
  } 
}

export default leaguesDatasourceImp