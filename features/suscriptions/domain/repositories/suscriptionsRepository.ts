import AddSuscriptionResult from "../entities/addSuscriptionResult";
import Suscription from "../entities/suscription";
import SuscriptionResult from "../entities/suscriptionResult";

abstract class SuscriptionRepository {
  abstract getSuscriptions(clubId:number): Promise<SuscriptionResult>;
  abstract AddSuscriptions(suscription: Suscription): Promise<AddSuscriptionResult>;
  abstract DeleteSuscription(suscription: Suscription): Promise<AddSuscriptionResult>;
}

export default SuscriptionRepository;