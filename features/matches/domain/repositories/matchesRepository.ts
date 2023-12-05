import AddMatchResult from "../entities/addMatchResult";
import ClubsResult from "../entities/clubsResult";
import Match from "../entities/match";
import MatchResult from "../entities/matchResult";

abstract class MatchesRepository {
    abstract getClubs() : Promise<ClubsResult>;
    abstract getMatches(leagueId: number) : Promise<MatchResult>;
    abstract addMatch(match: Match): Promise<AddMatchResult>;
    abstract deleteMatch(match: Match): Promise<AddMatchResult>;
}

export default MatchesRepository;