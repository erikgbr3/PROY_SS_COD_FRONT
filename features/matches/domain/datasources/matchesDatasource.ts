import MatchResult from "../entities/matchResult";

abstract class MatchesDatasource {
    abstract getMatches() : Promise<MatchResult>;
}

export default MatchesDatasource;