import ClubsDatasource from "../../domain/datasources/clubsDatasource";
import ClubsResult from "../../domain/entities/clubsResult";
import ClubsRepository from "../../domain/repositories/clubsRepository";

class ClubsRepositoryImp extends ClubsRepository {

    datasource: ClubsDatasource;

    constructor(datasource: ClubsDatasource) {
        super();
        this.datasource = datasource;
    }

    getClubs(): Promise<ClubsResult> {
        return this.datasource.getClubs();
    }
}

export default ClubsRepositoryImp;