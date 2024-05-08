class Position{
  id?: number;
  matchesWon: number;
  tiedMatches: number;
  gf: number;
  gc: number;
  dif: number;
  points: number;
  clubId: number;
  leagueId: number;
  clubName: string;

  constructor(
  matchesWon: number,
  tiedMatches: number,
  gf: number,
  gc: number,
  dif: number,
  points: number,
  clubId: number,
  leagueId: number,
  clubName: string,
  id?: number,
  ){
    this.matchesWon = matchesWon;
    this.tiedMatches = tiedMatches;
    this.gf = gf;
    this.gc = gc;
    this.dif = dif;
    this.points = points;
    this.clubId = clubId;
    this.leagueId = leagueId;
    this.clubName = clubName;
    this.id = id
  }
}

export default Position;