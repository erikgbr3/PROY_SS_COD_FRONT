import SportField from "./sportfield";

class AddSportFieldsResult{
  sportField: SportField[];
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
    this.sportField = sportField;
  }
}

export default AddSportFieldsResult;