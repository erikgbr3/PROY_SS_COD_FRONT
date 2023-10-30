import leaguesDatasource from "../../domain/datasources/leaguesDatasource";
import AddLeaguesResult from "../../domain/entities/addLeagueResult";
import League from "../../domain/entities/league";
import LeaguesResult from "../../domain/entities/leaguesResult";
import leaguesRepository from "../../domain/repositories/leaguesRepository";

class leaguesRepositoryImp extends leaguesRepository{
  datasource: leaguesDatasource;

  constructor(datasource: leaguesDatasource){
    super()
    this.datasource = datasource;
  }

  getLeagues():Promise<LeaguesResult>{
    return this.datasource.getLeagues();
  }

  addLeague(league: League): Promise<AddLeaguesResult> {
      return this.datasource.addLeague(league);
  }
}
export default leaguesRepositoryImp;