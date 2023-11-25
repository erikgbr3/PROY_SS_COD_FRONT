import backendConfig from "../../../../config/backend/config";
import usersDatasource from "../../domain/datasources/userDatasource";
import AddUsersResult from "../../domain/entities/addUserResult";
import User from "../../domain/entities/user";
import UsersResult from "../../domain/entities/usersResult";

class usersDatasourceImp extends usersDatasource {
  async getUsers(): Promise<UsersResult> {
    return fetch(`${backendConfig.url}/api/users`)
      .then((response) => response.json())
      .then((response) => {
        const users = response.map((item: any) => new User(
          item.username,
          item.email,
          item.password,
          item.roleId,
          item.id
        ))
        return new UsersResult(
          users
        )
      })
  }
  async addUser(user: User): Promise<AddUsersResult> {
    return fetch(`${backendConfig.url}/api/users`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((response) =>{
      const result = new AddUsersResult(response.message, response.user || null)
      result.errors = response.errors || null;
      result.error = response.error || null;

      return result;
    })
  }
}

export default usersDatasourceImp;