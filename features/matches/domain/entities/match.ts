import Club from "../../../clubs/domain/entities/club";

class Match {
    id?: number;
    homeTeamId: number;
    scoreHome?: number;
    visitorTeamId: number;
    scoreVisitor?: number;
    date: string;
    hour: string;
    refereeId: number;
    homeTeamName?: string; 
    visitorTeamName?: string;
    club?:Club;

    constructor (  
        homeTeamId: number,
        visitorTeamId: number,
        date: string,
        hour: string,
        refereeId: number,
        homeTeamName?: string,
        visitorTeamName?: string,
        id?: number,
        scoreHome?: number,
        scoreVisitor?: number,
    ) {
        this.id = id;
        this.homeTeamId = homeTeamId;
        this.scoreHome = scoreHome;
        this.visitorTeamId = visitorTeamId;
        this.scoreVisitor = scoreVisitor;
        this.date = date;
        this.hour = hour;
        this.refereeId = refereeId;
        this.homeTeamName = homeTeamName; 
        this.visitorTeamName = visitorTeamName; 
    }
}

export default Match;