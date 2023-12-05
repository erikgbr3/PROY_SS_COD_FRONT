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
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to fetch clubs: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then((response) => {
            if (!Array.isArray(response)) {
              console.error("Unexpected response format for clubs:", response);
                throw new Error("Unexpected response format for clubs");
            }

            const clubs = response.map((item: any) => new Club(item.id, item.name));
            return new ClubsResult(clubs);
        });
    }

    async addMatch(match: Match): Promise<AddMatchResult> {
      console.log(match);

      return fetch(`${BackendConfig.url}/api/matches`, {
        method: !match.id? "POST" : "PUT", // or 'PUT'
        body: JSON.stringify(match), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.json())
        .then((response) => {
          console.log(response); 
          const result = new AddMatchResult(response.message, response.match || null);
          result.errors = response.errors || null;
          result.error = response.error || false;

          return result;
        });

    }

    async getMatches(leagueId: number): Promise<MatchResult> {
      const clubsResult = await this.getClubs();
      const clubsMap = new Map(clubsResult.club.map((club) => [club.id, club]));
    
      return fetch(`${BackendConfig.url}/api/matches?leagueId=${leagueId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch matches: ${response.status} ${response.statusText}`);
          }
          return response.json();
        })
        .then((response: Record<string, Array<any>>) => { // Specify the type of response
          if (typeof response !== 'object' || response === null || Array.isArray(response)) {
            console.error("Unexpected response format for matches:", response);
            throw new Error("Unexpected response format for matches");
          }
    
          // Convert the object of matches grouped by date to a flat array
          const matches: Array<any> = Object.values(response).reduce((acc: Array<any>, matchesArray) => acc.concat(matchesArray), []);
    
          const formattedMatches = matches.map((item: any) => new Match(
            item.homeTeamId,
            item.visitorTeamId,
            item.date,
            item.hour,
            item.refereeId,
            item.homeTeamName = item.homeTeamId && clubsMap.get(item.homeTeamId)?.name,
            item.visitorTeamName = item.visitorTeamId && clubsMap.get(item.visitorTeamId)?.name,
            item.id,
            item.scoreHome,
            item.scoreVisitor,
          ));
    
          return new MatchResult(formattedMatches);
        });
    }

    async deleteMatch(match: Match): Promise<AddMatchResult> {
      return fetch(`${BackendConfig.url}/api/matches?matches?id=${match.id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': "application/json",
        }
      })
      .then((response) => response.json())
      .then((response) => {
        const result = new AddMatchResult(response.message, response.match || null);
        result.errors = response.errors || null;
        result.error = response.error || null;

        return result;
      })
    }
    
    
} 

export default MatchesDatasourceImp;