import AddSportFieldsResult from "../entities/addSportFieldResult";
import SportFieldsResult from "../entities/sportFieldsResult";
import SportField from "../entities/sportfield";

abstract class SportFieldsDatasource {
    abstract getSportFields() : Promise<SportFieldsResult>;
    abstract addSportField(sportField: SportField): Promise<AddSportFieldsResult>;
    abstract deleteSportField(sportField: SportField): Promise<AddSportFieldsResult>;
    abstract editSportField(sportFieldId: number, sportField:SportField): Promise<AddSportFieldsResult>;
}

export default SportFieldsDatasource;