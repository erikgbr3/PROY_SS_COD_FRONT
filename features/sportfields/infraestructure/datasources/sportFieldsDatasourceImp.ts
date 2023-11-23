import BackendConfig from "../../../../config/backend/config";
import SportFieldsDatasource from "../../domain/datasources/sportFieldsDatasource";
import AddSportFieldsResult from "../../domain/entities/addSportFieldResult";
import SportFieldResult from "../../domain/entities/sportFieldsResult";
import SportField from "../../domain/entities/sportfield";


class SportFieldsDatasourceImp extends SportFieldsDatasource {
    async getSportFields(): Promise<SportFieldResult> {

        return fetch(`${BackendConfig.url}/api/sportFields`)
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

    async addSportField(sportField: SportField): Promise<AddSportFieldsResult> {
        console.log(sportField);
        return fetch(`${BackendConfig.url}/api/sportFields`, {
          method: 'POST',
          body: JSON.stringify(sportField),
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => response.json())
        .then((response) =>{
          console.log('Result', response);      
          const result = new AddSportFieldsResult(response.message, response.sportField || null);
          result.errors = response.errors || null;
          result.error = response.error || null;
    
          return result;
        })
        
      }
}

export default SportFieldsDatasourceImp;