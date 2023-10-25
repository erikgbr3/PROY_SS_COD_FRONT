import PlayersDatasource from "../../domain/datasources/playersDatasource";
import PlayerResult from "../../domain/entities/playerResult";
import PlayersRepository from "../../domain/repositories/playersRespository";

class PlayersRepositoryImp extends PlayersRepository{
  datasource: PlayersDatasource;

  constructor(datasource: PlayersDatasource){
    super()
    this.datasource = datasource;
  }

  getPlayers():Promise<PlayerResult>{
    return this.datasource.getPlayers();
  }
}
export default PlayersRepositoryImp;