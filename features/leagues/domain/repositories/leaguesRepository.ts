import LoginUserResult from "../../../auth/domain/entities/loginUserResult";
import AddLeaguesResult from "../entities/addLeagueResult";
import League from "../entities/league";
import LeaguesResult from "../entities/leaguesResult";

abstract class leaguesRepository{
  abstract  getLeagues():Promise<LeaguesResult>;
  abstract addLeague(league: League): Promise<AddLeaguesResult>;
  abstract  getLeaguesAdmin(token: string):Promise<LeaguesResult>;
  abstract deleteLeague(league: League): Promise<AddLeaguesResult>;
  abstract editLeague(leagueId: number , league:League): Promise<AddLeaguesResult>;
}

export default leaguesRepository