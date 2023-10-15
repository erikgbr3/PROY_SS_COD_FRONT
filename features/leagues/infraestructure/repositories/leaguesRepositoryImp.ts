import leaguesDatasource from "../../domain/datasources/leaguesDatasource";
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
}
export default leaguesRepositoryImp;