import BackendConfig from "../../../../config/backend/config";
import AuthDatasource from "../../domain/datasources/authDatasource";
import Auth from "../../domain/entities/auth";
import LoginUserResult from "../../domain/entities/loginUserResult";

class AuthDatasourceImp extends AuthDatasource {
  async login(auth: Auth): Promise<LoginUserResult> {
    return fetch(`${BackendConfig.url}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(auth),
    })
      .then((response) => response.json())
      .then((response) => {
        //console.log('Result', response);
        const result = new LoginUserResult(response.auth, response.message, response.token, response.user  || null);
        result.errors = response.errors || null;
        result.error = response.error || null;
        return result;
      })
  }
}

export default AuthDatasourceImp