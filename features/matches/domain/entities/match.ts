class Match {
    id: number;
    homeTeamId: number;
    scoreHome: number;
    visitorTeamId: number;
    scoreVisitor: number;
    date: string;
    refereeId: number;
    homeTeamName: string; 
    visitorTeamName: string;

    constructor (
        id: number,
        homeTeamId: number,
        scoreHome: number,
        visitorTeamId: number,
        scoreVisitor: number,
        date: string,
        refereeId: number,
        homeTeamName: string,
        visitorTeamName: string,
    ) {
        this.id = id;
        this.homeTeamId = homeTeamId;
        this.scoreHome = scoreHome;
        this.visitorTeamId = visitorTeamId;
        this.scoreVisitor = scoreVisitor;
        this.date = date;
        this.refereeId = refereeId;
        this.homeTeamName = homeTeamName; 
        this.visitorTeamName = visitorTeamName; 
    }
}

export default Match;