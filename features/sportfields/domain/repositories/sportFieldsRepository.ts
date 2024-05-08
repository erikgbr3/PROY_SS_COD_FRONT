import AddSportFieldsResult from "../entities/addSportFieldResult";
import SportFieldResult from "../entities/sportFieldsResult";
import SportField from "../entities/sportfield";

abstract class SportFieldsRepository {
    abstract getSportFields() : Promise<SportFieldResult>;
    abstract addSportField(sportField: SportField): Promise<AddSportFieldsResult>;
    abstract deleteSportField(sportField: SportField): Promise<AddSportFieldsResult>;
    abstract editSportField(sportFieldId: number, sportField:SportField): Promise<AddSportFieldsResult>;
}

export default SportFieldsRepository;