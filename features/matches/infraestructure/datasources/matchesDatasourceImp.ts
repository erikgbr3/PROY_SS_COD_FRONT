import MatchesDatasource from "../../domain/datasources/matchesDatasource";
import Match from "../../domain/entities/match";
import MatchResult from "../../domain/entities/matchResult";

class MatchesDatasourceImp extends MatchesDatasource {
    async getMatches(): Promise<MatchResult> {
        
        return fetch('http://192.168.0.107:3000/api/matches')
        .then((response) => response.json())
        .then((response) => {

          const matches = response.map(( item : any ) =>  new Match(
          
            item.id,
            item.homeTeamId,
            item.scoreHome,
            item.visitorTeamId,
            item.scoreVisitor,
            item.date,
            item.refereeId,
            item.homeTeamName,
            item.visitorTeamName,
          )

        );
         return new MatchResult (
          matches
         )
        })
    }
}

export default MatchesDatasourceImp;