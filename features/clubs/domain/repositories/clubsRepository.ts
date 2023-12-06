import AddClubResult from "../entities/addClubResult";
import Club from "../entities/club";
import ClubsResult from "../entities/clubsResult";

abstract class ClubsRepository {
    abstract getClubs() : Promise<ClubsResult>;
    abstract getClubsAdmin(token: string):Promise<ClubsResult>;
    abstract addClub(club: Club): Promise<AddClubResult>;
    abstract deleteClub(club: Club): Promise<AddClubResult>;
}

export default ClubsRepository;