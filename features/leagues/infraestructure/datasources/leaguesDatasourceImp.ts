import BackendConfig from "../../../../config/backend/config";
import leaguesDatasource from "../../domain/datasources/leaguesDatasource";
import League from "../../domain/entities/league";
import LeaguesResult from "../../domain/entities/leaguesResult";

class leaguesDatasourceImp extends leaguesDatasource{
  async getLeagues(): Promise<LeaguesResult> {
    return fetch(`${BackendConfig.url}/api/leagues`)
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