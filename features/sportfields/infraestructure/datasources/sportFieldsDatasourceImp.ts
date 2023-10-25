import SportFieldsDatasource from "../../domain/datasources/sportFieldsDatasource";
import SportFieldResult from "../../domain/entities/sportFieldsResult";
import SportField from "../../domain/entities/sportfield";


class SportFieldsDatasourceImp extends SportFieldsDatasource {
    async getSportFields(): Promise<SportFieldResult> {

        return fetch('http://192.168.0.107:3000/api/sportFields')
        .then((response) => response.json())
        .then((response) => {

            const sportField = response.map((item : any) => new SportField(
                item.id,
                item.ubication,
                item.name,
                )
            );
            return new SportFieldResult(
                sportField
            )
        });
    }
}

export default SportFieldsDatasourceImp;