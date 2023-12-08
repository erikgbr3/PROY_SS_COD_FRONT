import ClubsDatasource from "../../domain/datasources/clubsDatasource";
import AddClubResult from "../../domain/entities/addClubResult";
import Club from "../../domain/entities/club";
import ClubsResult from "../../domain/entities/clubsResult";
import ClubsRepository from "../../domain/repositories/clubsRepository";

class ClubsRepositoryImp extends ClubsRepository {

    datasource: ClubsDatasource;

    constructor(datasource: ClubsDatasource) {
        super();
        this.datasource = datasource;
    }
    addClub(club: Club): Promise<AddClubResult> {
        return this.datasource.addClub(club);
    }

    getClubsAdmin(token: string): Promise<ClubsResult> {
        return this.datasource.getClubsAdmin(token);
    }

    getClubs(leagueId:number): Promise<ClubsResult> {
        return this.datasource.getClubs(leagueId);
    }

    deleteClub(club: Club): Promise<AddClubResult> {
        return this.datasource.deleteClub(club);
    }
}

export default ClubsRepositoryImp;