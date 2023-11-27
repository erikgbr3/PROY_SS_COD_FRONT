import AddClubResult from "../entities/addClubResult";
import Club from "../entities/club";
import ClubsResult from "../entities/clubsResult";

abstract class ClubsDatasource {
    abstract getClubs() : Promise<ClubsResult>;
    abstract addClub(club: Club): Promise<AddClubResult>;
}

export default ClubsDatasource;