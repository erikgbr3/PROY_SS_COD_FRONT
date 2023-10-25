import MatchesDatasource from "../../domain/datasources/matchesDatasource";
import AddMatchResult from "../../domain/entities/addMatchResult";
import ClubsResult from "../../domain/entities/clubsResult";
import Match from "../../domain/entities/match";
import MatchResult from "../../domain/entities/matchResult";
import MatchesRepository from "../../domain/repositories/matchesRepository";

class MatchesRepositoryImp extends MatchesRepository {
   
    datasource: MatchesDatasource;

    constructor(datasource: MatchesDatasource) {
        super();
        this.datasource = datasource;
    }

    getClubs(): Promise<ClubsResult> {
        return this.datasource.getClubs();
    }
    
    addMatches(match: Match): Promise<AddMatchResult> {
        return this.datasource.addMatches(match);
    }

    getMatches(): Promise<MatchResult> {
        return this.datasource.getMatches();
    }
}

export default MatchesRepositoryImp;