import SuscriptionDatasource from "../../domain/datasources/suscriptionsDatasource";
import AddSuscriptionResult from "../../domain/entities/addSuscriptionResult";
import Suscription from "../../domain/entities/suscription";
import SuscriptionResult from "../../domain/entities/suscriptionResult";
import SuscriptionRepository from "../../domain/repositories/suscriptionsRepository";

class SuscriptionRepositoryImp extends SuscriptionRepository{
  datasource: SuscriptionDatasource;

  constructor(datasource: SuscriptionDatasource){
    super();
    this.datasource = datasource;
  } 

  DeleteSuscription(suscription: Suscription): Promise<AddSuscriptionResult> {
    return this.datasource.DeleteSuscription(suscription);
  }

  AddSuscriptions(suscription: Suscription): Promise<AddSuscriptionResult> {
    return this.datasource.AddSuscriptions(suscription);
  }

  getSuscriptions(): Promise<SuscriptionResult> {
    return this.datasource.getSuscriptions();
  } 
  
}

export default SuscriptionRepositoryImp;