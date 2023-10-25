import BackendConfig from "../../../../config/backend/config";
import PlayersDatasource from "../../domain/datasources/playersDatasource"
import Player from "../../domain/entities/player";
import PlayerResult from "../../domain/entities/playerResult";

class PlayersDatasourceImp extends PlayersDatasource{
  async getPlayers(): Promise<PlayerResult> {
    return fetch(`${BackendConfig.url}/api/players`)
    .then((response) => response.json())
    .then((response) => {
      const players = response.map((item:any) => new Player(
        item.id,
        item.name,
        item.lastname,
        item.numberjersey,
        item.age,
        item.position,
        item.cellphone,
        item.curp,
        item.clubId,
      ))
      return new PlayerResult(
        players
      )
    })
  } 
}

export default PlayersDatasourceImp;