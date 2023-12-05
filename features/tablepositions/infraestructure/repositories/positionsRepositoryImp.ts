import PositionsDatasource from "../../domain/datasources/positionsDatasource";
import PositionResult from "../../domain/entities/tablePositionResult";
import PositionsRepository from "../../domain/repositories/positionRepository";

class PositionRepositoryImp extends PositionsRepository{
  datasource: PositionsDatasource;
  constructor(datasource: PositionsDatasource){
    super()
    this.datasource = datasource
  };
  getPositions(leagueId: number): Promise<PositionResult> {
      return this.datasource.getPositions(leagueId)
  }
}

export default PositionRepositoryImp;