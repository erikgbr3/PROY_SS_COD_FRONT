import MatchResult from "../entities/matchResult";

abstract class MatchesRepository {
    abstract getMatches() : Promise<MatchResult>;
}

export default MatchesRepository;