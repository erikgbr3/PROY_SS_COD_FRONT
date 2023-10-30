import AddPlayerResult from "../entities/addPlayerResult";
import Player from "../entities/player";
import PlayerResult from "../entities/playerResult";

abstract class PlayersDatasource {
    abstract getPlayers() : Promise<PlayerResult>;
    abstract addPlayer( player : Player ) : Promise<AddPlayerResult> 
}

export default PlayersDatasource;