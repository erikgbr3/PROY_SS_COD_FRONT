import Player from "./player";

class AddPlayerResult {
  player: Player;
  error?: boolean;
  message: string;
  errors?: {
    error: string,
    field: string,
  } [] | null;

  constructor (
      message: string,
      player: Player,
  ) { 
      this.message = message;
      this.player = player;
  }
}

export default AddPlayerResult;