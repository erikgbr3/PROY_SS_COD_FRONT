import MatchesDatasource from "../../domain/datasources/matchesDatasource";
import Match from "../../domain/entities/match";
import MatchResult from "../../domain/entities/matchResult";
import MatchesRepository from "../../domain/repositories/matchesRepository";

class MatchesRepositoryImp extends MatchesRepository {
    datasource: MatchesDatasource;

    constructor(datasource: MatchesDatasource) {
        super();
        this.datasource = datasource;
    }

    getMatches(): Promise<MatchResult> {
        return this.datasource.getMatches();
    }
}

export default MatchesRepositoryImp;