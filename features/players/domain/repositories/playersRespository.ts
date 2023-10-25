import PlayerResult from "../entities/playerResult";

abstract class PlayersRepository {
    abstract getPlayers() : Promise<PlayerResult>;
}

export default PlayersRepository;