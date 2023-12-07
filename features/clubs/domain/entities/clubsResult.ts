import Club from "./club";

class ClubsResult{
    clubs: Club[];

    constructor(
        clubs: Club[],
    ) {
        this.clubs = clubs;
    }
}

export default ClubsResult;