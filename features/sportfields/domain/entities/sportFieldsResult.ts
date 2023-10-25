import SportField from "./sportfield";

class SportFieldResult{
    sportField: SportField[];

    constructor(
        sportField: SportField[],
    ){
        this.sportField = sportField;
    }
}

export default SportFieldResult;