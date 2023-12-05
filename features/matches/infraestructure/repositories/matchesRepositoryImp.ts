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
    
    addMatch(match: Match): Promise<AddMatchResult> {
        return this.datasource.addMatch(match);
    }

    getMatches(leagueId: number): Promise<MatchResult> {
        return this.datasource.getMatches(leagueId);
    }

    deleteMatch(match: Match): Promise<AddMatchResult> {
        return this.datasource.deleteMatch(match);
    }
}

export default MatchesRepositoryImp;