import SportFieldsResult from "../entities/sportFieldsResult";

abstract class SportFieldsDatasource {
    abstract getSportFields() : Promise<SportFieldsResult>;
}

export default SportFieldsDatasource;