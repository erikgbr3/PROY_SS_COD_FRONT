import SportFieldsDatasource from "../../domain/datasources/sportFieldsDatasource";
import SportFieldResult from "../../domain/entities/sportFieldsResult";
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
}

export default SportFieldsRepositoryImp;