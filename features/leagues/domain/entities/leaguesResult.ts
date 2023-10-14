import League from "./league";

class LeaguesResult{
  leagues: League[];

  constructor(
    leagues: League[]
  ){
    this.leagues = leagues;
  }
}

export default LeaguesResult;