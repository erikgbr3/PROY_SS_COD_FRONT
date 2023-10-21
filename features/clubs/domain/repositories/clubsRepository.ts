import ClubsResult from "../entities/clubsResult";

abstract class ClubsRepository {
    abstract getClubs() : Promise<ClubsResult>;
}

export default ClubsRepository;