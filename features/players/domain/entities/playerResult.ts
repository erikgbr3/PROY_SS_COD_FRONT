import Player from "./player";

class PlayerResult {
  players: Player[];

  constructor (
      players: Player[],
  ) {
      this.players = players;
  }
}

export default PlayerResult;