import ClubsResult from "../entities/clubsResult";

abstract class ClubsDatasource {
    abstract getClubs() : Promise<ClubsResult>;
}

export default ClubsDatasource;