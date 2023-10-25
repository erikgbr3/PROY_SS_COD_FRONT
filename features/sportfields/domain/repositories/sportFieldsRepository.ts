import SportFieldResult from "../entities/sportFieldsResult";

abstract class SportFieldsRepository {
    abstract getSportFields() : Promise<SportFieldResult>;
}

export default SportFieldsRepository;