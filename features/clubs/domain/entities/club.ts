class Club {
    id: number;
    name: string;
    locality: string;
    fieldId: number;
    ownerTeamId: number;

    constructor(
        id: number,
        name:string, 
        locality: string,
        fieldId: number,
        ownerTeamId: number,
        ){
            this.id = id;
            this.name = name;
            this.locality = locality;
            this.fieldId = fieldId;
            this.ownerTeamId = ownerTeamId;  
    }
}

export default Club;