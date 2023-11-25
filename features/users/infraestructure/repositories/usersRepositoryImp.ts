import usersDatasource from "../../domain/datasources/userDatasource";
import AddUsersResult from "../../domain/entities/addUserResult";
import User from "../../domain/entities/user";
import UsersResult from "../../domain/entities/usersResult";
import usersRepository from "../../domain/repositories/usersRepository";

class usersRepositoryImp extends usersRepository{
  datasource: usersDatasource;

  constructor(datasource: usersDatasource){
    super()
    this.datasource = datasource;
  }

  getUsers(): Promise<UsersResult> {
    return this.datasource.getUsers();
  }

  addUser(user: User): Promise<AddUsersResult> {
    return this.datasource.addUser(user);
  }

}
export default usersRepositoryImp