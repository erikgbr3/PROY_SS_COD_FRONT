import LeaguesResult from "../entities/leaguesResult";

abstract class leaguesRepository{
  abstract  getLeagues():Promise<LeaguesResult>
}

export default leaguesRepository