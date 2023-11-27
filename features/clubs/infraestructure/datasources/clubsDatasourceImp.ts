import BackendConfig from "../../../../config/backend/config";
import ClubsDatasource from "../../domain/datasources/clubsDatasource";
import AddClubResult from "../../domain/entities/addClubResult";
import Club from "../../domain/entities/club";
import ClubsResult from "../../domain/entities/clubsResult";

class ClubsDatasourceImp extends ClubsDatasource {
    async addClub(club: Club): Promise<AddClubResult> {
        console.log(club);
        return fetch(`${BackendConfig.url}/api/clubs`, {
          method: 'POST',
          body: JSON.stringify(club),
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => response.json())
        .then((response) =>{
          console.log('Result', response);      
          const result = new AddClubResult(response.message, response.club || null);
          result.errors = response.errors || null;
          result.error = response.error || null;
    
          return result;
        })
        
      }

    async getClubs(): Promise<ClubsResult> {

        return fetch(`${BackendConfig.url}/api/clubs`)
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