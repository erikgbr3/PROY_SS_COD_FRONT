import PlayerResult from "../entities/playerResult";

abstract class PlayersDatasource {
    abstract getPlayers() : Promise<PlayerResult>;
}

export default PlayersDatasource;