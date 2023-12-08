import BackendConfig from "../../../../config/backend/config";
import League from "../../../leagues/domain/entities/league";
import LeaguesResult from "../../../leagues/domain/entities/leaguesResult";
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

  async getLeagues(): Promise<LeaguesResult> {
    return fetch(`${BackendConfig.url}/api/leagues`)
    .then((response) => response.json())
    .then((response) => {
      const leagues = response.map((item:any) =>new League(
        item.name,
        item.cost,
        item.prize,
        item.init, 
        item.description, 
        item.ownerId,
        item.id,
      ))
      return new LeaguesResult(
        leagues
      )
    })
  }

  async getSuscriptions(clubId:number): Promise<SuscriptionResult> {
    return fetch(`${BackendConfig.url}/api/suscriptions?clubId=${clubId}`)
      .then((response) => response.json())
      .then((response) => {
        const suscriptions = response.suscriptions.map((item: any) => {
          // Obtener los datos de la liga correspondiente
          const leagueData = item.league;

          // Crear la instancia de League usando los datos proporcionados
          const leagueInstance = new League(
            leagueData.name || '',
            leagueData.cost || '',
            leagueData.prize || '',
            leagueData.init || '',
            leagueData.description || '',
            leagueData.ownerId || 0,
            leagueData.id || 0 // Puedes manejar el valor predeterminado según tu necesidad
            // Agregar otros campos de la liga según corresponda
          );

          // Crear la instancia de Suscription con la liga correspondiente
          return new Suscription(
            item.leagueId,
            item.clubId,
            item.id,
            leagueInstance // Asigna la instancia de League a la propiedad league
          );
        });

        return new SuscriptionResult(suscriptions);
      });
  }
  
}

export default SuscriptionDatasourceImp;