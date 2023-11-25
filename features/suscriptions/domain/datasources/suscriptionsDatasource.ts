import AddSuscriptionResult from "../entities/addSuscriptionResult";
import Suscription from "../entities/suscription";
import SuscriptionResult from "../entities/suscriptionResult";

abstract class SuscriptionDatasource {
  abstract getSuscriptions(): Promise<SuscriptionResult>;
  abstract AddSuscriptions(suscription: Suscription): Promise<AddSuscriptionResult>;
  abstract DeleteSuscription(suscription: Suscription): Promise<AddSuscriptionResult>;
}

export default SuscriptionDatasource;