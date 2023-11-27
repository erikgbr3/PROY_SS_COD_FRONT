import BackendConfig from "../../../../config/backend/config";
import SuscriptionDatasource from "../../domain/datasources/suscriptionsDatasource";
import AddSuscriptionResult from "../../domain/entities/addSuscriptionResult";
import Suscription from "../../domain/entities/suscription";
import SuscriptionResult from "../../domain/entities/suscriptionResult";

class SuscriptionDatasourceImp extends SuscriptionDatasource {
  async AddSuscriptions(suscriptions: Suscription): Promise<AddSuscriptionResult> {
    return fetch(`${BackendConfig}/api/suscriptions`, {
      method: !suscriptions.id ? "POST" : "PATCH",
      body: JSON.stringify(suscriptions),
      headers: {
        "content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((response) => {
      const result = new AddSuscriptionResult(response.message, response.suscriptions || null);
      result.errors = response.errors || null;
      result.error= response.error || false;
      console.log(response);
      return result;
    })
  }

  async DeleteSuscription(suscription: Suscription): Promise<AddSuscriptionResult> {
    return fetch(`${BackendConfig.url}/api/suscriptions?suscriptionSelected=${suscription.id}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
      },
  })

      .then((response) => response.json())
      .then((response) => {

          const result = new AddSuscriptionResult(response.message, response.suscriptions || null);
          result.errors = response.errors || null;
          result.error = response.error || false;
          console.log(response);

          return result;
      });
  } 
  async getSuscriptions(): Promise<SuscriptionResult> {
    return fetch(`${BackendConfig.url}/api/suscriptions`)
    .then((response) => response.json())
    .then((response) => {
      const suscriptions = response.map((item: any) => new Suscription(
        item.leagueId,
        item.clubId,
        item.id,
      ));
      return new SuscriptionResult(suscriptions)
    });
  }
  
}

export default SuscriptionDatasourceImp;