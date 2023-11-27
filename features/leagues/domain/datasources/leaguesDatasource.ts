import LoginUserResult from "../../../auth/domain/entities/loginUserResult";
import AddLeaguesResult from "../entities/addLeagueResult";
import League from "../entities/league";
import LeaguesResult from "../entities/leaguesResult";

abstract class leaguesDatasource{
  abstract  getLeagues():Promise<LeaguesResult>
  abstract  getLeaguesAdmin(token: string):Promise<LeaguesResult>
  abstract addLeague(league: League): Promise<AddLeaguesResult>;
}

export default leaguesDatasource