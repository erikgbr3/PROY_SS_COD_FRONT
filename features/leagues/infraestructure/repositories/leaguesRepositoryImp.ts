import LoginUserResult from "../../../auth/domain/entities/loginUserResult";
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

  getLeaguesAdmin(token: string): Promise<LeaguesResult> {
      return this.datasource.getLeaguesAdmin(token);
  }

  addLeague(league: League): Promise<AddLeaguesResult> {
      return this.datasource.addLeague(league);
  }

  deleteLeague(league: League): Promise<AddLeaguesResult> {
      return this.datasource.deleteLeague(league);
  }

  editLeague(leagueId: number, league: League): Promise<AddLeaguesResult> {
      return this.datasource.editLeague(leagueId, league)
  }
}
export default leaguesRepositoryImp;