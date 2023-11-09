class User{
  id?: number;
  username: string;
  email: string;
  password: string;
  roleId: number;

  constructor(
    username: string,
    email: string,
    password: string,
    roleId: number,
    id?: number
  ){
    this.username = username,
    this.email = email,
    this.password = password,
    this.roleId = roleId,
    this.id = id
  }

}

export default User; 