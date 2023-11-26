import Auth from "../../domain/entities/auth";
import LoginUserResult from "../../domain/entities/loginUserResult";
import AuthRepository from "../../domain/repositories/authRepository";
import AuthDatasource from "../datasources/authDatasourceImp";

class AuthRepositoryImp extends AuthRepository{
  datasource: AuthDatasource;

  constructor(datasource: AuthDatasource){
    super()
    this.datasource = datasource
  }
  login(auth: Auth): Promise<LoginUserResult> {
      return this.datasource.login(auth)
  }
}

export default AuthRepositoryImp;