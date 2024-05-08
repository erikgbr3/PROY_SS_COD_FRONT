import League from "../../../leagues/domain/entities/league";

class Suscription {
  id?: number;
  leagueId: number;
  clubId: number;
  league?: League

  constructor(
    leagueId: number,
    clubId: number,
    id?: number,
    league?: League,
  ) {
    this.id = id;
    this.leagueId = leagueId;
    this.clubId = clubId;
    this.league = league
  }
}

export default Suscription;