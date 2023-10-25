class Player {
  id: number;
  name: string;
  lastname: string;
  age: string;
  numberjersey: string;
  position: string;
  cellphone: string;
  curp: string;
  clubId: number;


  constructor(
      id: number,
      name:string,
      lastname: string,
      age: string,
      numberjersey: string,
      position: string,
      cellphone: string,
      curp: string,
      clubId: number,
      ){
          this.id = id;
          this.name = name; 
          this.lastname = lastname;
          this.age = age;
          this.numberjersey = numberjersey;
          this.position  = position;
          this.cellphone = cellphone;
          this.curp = curp;
          this.clubId = clubId;
  }
}

export default Player;