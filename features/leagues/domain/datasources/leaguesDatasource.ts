import LeaguesResult from "../entities/leaguesResult";

abstract class leaguesDatasource{
  abstract  getLeagues():Promise<LeaguesResult>
}

export default leaguesDatasource