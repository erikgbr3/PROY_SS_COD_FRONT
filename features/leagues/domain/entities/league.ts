class League{
  id?: number;
  name: string;
  cost: string;
  prize: string;
  init: string;
  description: string;
  ownerId: number;
  
  //owner?: User; para llamar los datos del propietario
  constructor(
    
    name: string,
    cost: string,
    prize: string,
    init: string,
    description: string,
    ownerId: number,
    id?: number,
  ){
    this.id = id;
    this.name = name;
    this.cost = cost;
    this.prize = prize;
    this.init = init;
    this.description = description;
    this.ownerId = ownerId;
  }
}

export default League;