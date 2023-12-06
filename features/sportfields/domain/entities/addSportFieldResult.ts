import SportField from "./sportfield";

class AddSportFieldsResult{
  sportFields: SportField[];
  error?: boolean;
  message: string;
  errors?: {
    error: string,
    field: string
  }[] | null;

  constructor(
    message: string,
    sportField: SportField[],

  ){
    this.message = message,
    this.sportFields = sportField;
  }
}

export default AddSportFieldsResult;