import Suscription from "./suscription";

class AddSuscriptionResult {
  suscription?: Suscription;
  error?: boolean;
    message: string;
    errors?: {
      error: string,
      field: string
    } [] | null;

    constructor(
      message: string,
      suscription: Suscription,
    ) {
      this.message = message;
      this.suscription = suscription;
    }
}

export default AddSuscriptionResult;