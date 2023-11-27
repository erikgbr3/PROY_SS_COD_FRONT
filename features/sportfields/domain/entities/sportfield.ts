class SportField{
    ubication: string
    name: string;
    id?: number;

    constructor(
        ubication: string,
        name: string,
        id?: number,
    ){
        this.id = id;
        this.ubication = ubication;
        this.name = name;
    }
}

export default SportField;