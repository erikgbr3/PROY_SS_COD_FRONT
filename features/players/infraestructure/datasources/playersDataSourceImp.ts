import BackendConfig from "../../../../config/backend/config";
import PlayersDatasource from "../../domain/datasources/playersDatasource"
import AddPlayerResult from "../../domain/entities/addPlayerResult";
import Player from "../../domain/entities/player";
import PlayerResult from "../../domain/entities/playerResult";

class PlayersDatasourceImp extends PlayersDatasource{
  async addPlayer( player : Player ): Promise<AddPlayerResult> {
    console.log(player);

    return fetch(`${BackendConfig.url}/api/players`, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(player), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
      .then((response) => {
        console.log(response); 
        const result = new AddPlayerResult(response.message, response.player || null);
        result.errors = response.errors || null;
        result.error = response.error || false;

        return result;
      });
  }

  async getPlayers(): Promise<PlayerResult> {
    return fetch(`${BackendConfig.url}/api/players`)
    .then((response) => response.json())
    .then((response) => {
      const players = response.map((item:any) => new Player(
        item.name,
        item.lastname,
        item.numberjersey,
        item.age,
        item.position,
        item.cellphone,
        item.curp,
        item.clubId,
        item.id
      ))
      return new PlayerResult(
        players
      )
    })
  } 
}

export default PlayersDatasourceImp;