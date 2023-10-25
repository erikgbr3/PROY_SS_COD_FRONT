import ClubsDatasource from "../../domain/datasources/clubsDatasource";
import Club from "../../domain/entities/club";
import ClubsResult from "../../domain/entities/clubsResult";

class ClubsDatasourceImp extends ClubsDatasource {
    async getClubs(): Promise<ClubsResult> {

        return fetch('http://192.168.0.107:3000/api/clubs')
        .then((response) => response.json())
        .then((response) => {

            const club = response.map((item : any) => new Club(
                item.id,
                item.name,
                item.locality,
                item.fieldId,
                item.ownerTeamId
                )
            );
            return new ClubsResult(
                club
            )
        });
    }
}

export default ClubsDatasourceImp;