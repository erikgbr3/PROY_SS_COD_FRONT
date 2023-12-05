import PositionResult from "../entities/tablePositionResult";

abstract class PositionsDatasource{
  abstract getPositions(leagueId:number):Promise<PositionResult>
}

export default PositionsDatasource;