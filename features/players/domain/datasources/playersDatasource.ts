import AddPlayerResult from "../entities/addPlayerResult";
import Player from "../entities/player";
import PlayerResult from "../entities/playerResult";

abstract class PlayersDatasource {
    abstract getPlayers(clubId: number) : Promise<PlayerResult>;
    abstract addPlayer( player : Player ) : Promise<AddPlayerResult>;
    abstract deletePlayer (player: Player) : Promise<AddPlayerResult>;
}

export default PlayersDatasource;