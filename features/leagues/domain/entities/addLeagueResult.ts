import League from "./league";

class AddLeaguesResult{
  league: League[];
  error?: boolean;
  message: string;
  errors?: {
    error: string,
    field: string
  }[] | null;

  constructor(
    message: string,
    league: League[],

  ){
    this.message = message,
    this.league = league;
  }
}

export default AddLeaguesResult;