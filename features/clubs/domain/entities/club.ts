class Club {
    id?: number;
    name: string;
    locality: string;
    fieldId?: number;
    ownerTeamId?: number;

    constructor(
        name:string, 
        locality: string,
        fieldId?: number,
        ownerTeamId?: number,
        id?: number,
        ){
            this.name = name;
            this.locality = locality;
            this.fieldId = fieldId;
            this.ownerTeamId = ownerTeamId;  
            this.id = id;
    }
}

export default Club;