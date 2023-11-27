import Auth from "../entities/auth";
import LoginUserResult from "../entities/loginUserResult";

abstract class AuthDatasource{
  abstract login(auth:Auth) : Promise<LoginUserResult>
}

export default AuthDatasource;