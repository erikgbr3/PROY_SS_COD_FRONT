import SportFieldsDatasource from "../../domain/datasources/sportFieldsDatasource";
import AddSportFieldsResult from "../../domain/entities/addSportFieldResult";
import SportFieldResult from "../../domain/entities/sportFieldsResult";
import SportField from "../../domain/entities/sportfield";
import SportFieldsRepository from "../../domain/repositories/sportFieldsRepository";

class SportFieldsRepositoryImp extends SportFieldsRepository {

    datasource: SportFieldsDatasource;

    constructor(datasource: SportFieldsDatasource) {
        super();
        this.datasource = datasource;
    }

    getSportFields(): Promise<SportFieldResult> {
        return this.datasource.getSportFields();
    }

    addSportField(sportField:SportField): Promise<AddSportFieldsResult>{
        return this.datasource.addSportField(sportField);
    }

    deleteSportField(sportField: SportField): Promise<AddSportFieldsResult> {
        return this.datasource.deleteSportField(sportField);
    }
  
    editSportField(sportFieldId: number, sportField: SportField): Promise<AddSportFieldsResult> {
        return this.datasource.editSportField(sportFieldId, sportField)
    }
}

export default SportFieldsRepositoryImp;