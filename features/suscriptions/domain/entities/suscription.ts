class Suscription {
  id?: number;
  leagueId: number;
  clubId: number;

  constructor(
    leagueId: number,
    clubId: number,
    id?: number,
  ) {
    this.id = id;
    this.leagueId = leagueId;
    this.clubId = clubId;
  }
}

export default Suscription;