class Match {
    homeTeamId: number;
    scoreHome: number;
    visitorTeamId: number;
    scoreVisitor: number;
    date: string;
    refereeId: number;

    constructor (
        homeTeamId: number,
        scoreHome: number,
        visitorTeamId: number,
        scoreVisitor: number,
        date: string,
        refereeId: number,
    ) {
        this.homeTeamId = homeTeamId;
        this.scoreHome = scoreHome;
        this.visitorTeamId = visitorTeamId;
        this.scoreVisitor = scoreVisitor;
        this.date = date;
        this.refereeId = refereeId;
    }
}