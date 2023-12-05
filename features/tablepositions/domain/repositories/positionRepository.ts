import PositionResult from "../entities/tablePositionResult";

abstract class PositionsRepository{
  abstract getPositions(leagueId:number):Promise<PositionResult>
}

export default PositionsRepository;