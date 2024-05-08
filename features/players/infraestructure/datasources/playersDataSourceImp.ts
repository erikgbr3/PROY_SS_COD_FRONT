import BackendConfig from "../../../../config/backend/config";
import PlayersDatasource from "../../domain/datasources/playersDatasource"
import AddPlayerResult from "../../domain/entities/addPlayerResult";
import Player from "../../domain/entities/player";
import PlayerResult from "../../domain/entities/playerResult";

class PlayersDatasourceImp extends PlayersDatasource{

  async addPlayer( player : Player ): Promise<AddPlayerResult> {
    console.log(player);

    return fetch(`${BackendConfig.url}/api/players`, {
      method: !player.id? "POST" : "PUT",
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

  async getPlayers(clubId:number): Promise<PlayerResult> {
    return fetch(`${BackendConfig.url}/api/players?clubId=${clubId}`)
    .then((response) => response.json())
    .then((response) => {
      const players = response.map((item:any) => new Player(
        item.name,
        item.lastname,
        item.age,
        item.numberjersey,
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

  async deletePlayer(player: Player): Promise<AddPlayerResult> {
    return fetch(`${BackendConfig.url}/api/players?id=${player.id}`, {
      method: 'DELETE',
      headers: {
        'Contend-type': "application/json",
      }
    })
    .then((response) => response.json())
      .then((response) => {
        const result = new AddPlayerResult(response.message, response.player || null);
        result.errors = response.errors || null;
        result.error = response.error || null;

        return result;
      })
  }
}

export default PlayersDatasourceImp;