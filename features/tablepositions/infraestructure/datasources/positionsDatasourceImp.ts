import BackendConfig from "../../../../config/backend/config";
import PositionsDatasource from "../../domain/datasources/positionsDatasource";
import PositionResult from "../../domain/entities/tablePositionResult";
import Position from "../../domain/entities/tableposition";

class PositionsDatasourceImp extends PositionsDatasource{
  async getPositions(leagueId:number): Promise<PositionResult> {
    return fetch(`${BackendConfig.url}/api/positions?leagueId=${leagueId}`)
    .then((response) => response.json())
    .then((response) => {
      const positions = response.map((item:any) => new Position(
        item.matchesWon,
        item.tiedMatches,
        item.gf,
        item.gc,
        item.dif,
        item.points,
        item.clubId,
        item.leagueId,
        item.clubName,
        item.id
      ))
      return new PositionResult(
        positions
      )
    })
  }
}

export default PositionsDatasourceImp;