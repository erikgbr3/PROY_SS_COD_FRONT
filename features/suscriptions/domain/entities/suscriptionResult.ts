import Suscription from "./suscription";

class SuscriptionResult {
  suscriptions: Suscription[];

  constructor (
      suscriptions: Suscription[],
  ) {
      this.suscriptions = suscriptions;
  }
}

export default SuscriptionResult;