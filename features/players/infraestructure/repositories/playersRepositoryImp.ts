import PlayersDatasource from "../../domain/datasources/playersDatasource";
import AddPlayerResult from "../../domain/entities/addPlayerResult";
import Player from "../../domain/entities/player";
import PlayerResult from "../../domain/entities/playerResult";
import PlayersRepository from "../../domain/repositories/playersRespository";

class PlayersRepositoryImp extends PlayersRepository{
  
  datasource: PlayersDatasource;

  constructor(datasource: PlayersDatasource){
    super()
    this.datasource = datasource;
  }

  addPlayer( player : Player ): Promise<AddPlayerResult> {
    return this.datasource.addPlayer(player);
  }

  getPlayers(clubId:number):Promise<PlayerResult>{
    return this.datasource.getPlayers(clubId);
  }
}
export default PlayersRepositoryImp;