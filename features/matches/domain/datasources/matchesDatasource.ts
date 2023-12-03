import AddMatchResult from "../entities/addMatchResult";
import ClubsResult from "../entities/clubsResult";
import Match from "../entities/match";
import MatchResult from "../entities/matchResult";

abstract class MatchesDatasource {
    abstract getClubs() : Promise<ClubsResult>;
    abstract getMatches() : Promise<MatchResult>;
    abstract addMatch(match: Match): Promise<AddMatchResult>;
}

export default MatchesDatasource;