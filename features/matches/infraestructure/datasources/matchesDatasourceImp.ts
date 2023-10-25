import BackendConfig from "../../../../config/backend/config";
import MatchesDatasource from "../../domain/datasources/matchesDatasource";
import AddMatchResult from "../../domain/entities/addMatchResult";
import Club from "../../domain/entities/club";
import ClubsResult from "../../domain/entities/clubsResult";
import Match from "../../domain/entities/match";
import MatchResult from "../../domain/entities/matchResult";

class MatchesDatasourceImp extends MatchesDatasource {
    async getClubs(): Promise<ClubsResult> {
      return fetch(`${BackendConfig.url}/api/clubs`)
        .then((response) => response.json())
        .then((response) => {

            const club = response.map((item : any) => new Club(
                item.id,
                item.name,
                )
            );
            return new ClubsResult(
                club
            )
        });
    }
    async addMatches(match: Match): Promise<AddMatchResult> {

      return fetch(`${BackendConfig.url}/api/matches`, {
        method: "POST", // or 'PUT'
        body: JSON.stringify(match), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.json())
        .then((response) => {
          console.log(response);
          return match;
        });

    }
    async getMatches(): Promise<MatchResult> {
      const clubsResult = await this.getClubs();
      const clubsMap = new Map(clubsResult.club.map((club) => [club.id, club]));

      return fetch(`${BackendConfig.url}/api/matches`)
          .then((response) => response.json())
          .then((response) => {
              const matches = response.map((item: any) => new Match(
                  item.id,
                  item.homeTeamId,
                  item.scoreHome,
                  item.visitorTeamId,
                  item.scoreVisitor,
                  item.date,
                  item.hour,
                  item.refereeId,
                  item.homeTeamName = item.homeTeamId && clubsMap.get(item.homeTeamId)?.name, 
                  item.visitorTeamName= item.visitorTeamId && clubsMap.get(item.visitorTeamId)?.name 
              ));

              return new MatchResult(matches);
          });
    }
}

export default MatchesDatasourceImp;