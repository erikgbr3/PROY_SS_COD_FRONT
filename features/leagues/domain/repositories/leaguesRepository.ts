import AddLeaguesResult from "../entities/addLeagueResult";
import League from "../entities/league";
import LeaguesResult from "../entities/leaguesResult";

abstract class leaguesRepository{
  abstract  getLeagues():Promise<LeaguesResult>;
  abstract addLeague(league: League): Promise<AddLeaguesResult>;
}

export default leaguesRepository