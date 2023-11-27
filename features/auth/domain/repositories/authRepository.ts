import Auth from "../entities/auth";
import LoginUserResult from "../entities/loginUserResult";

abstract class AuthRepository{
  abstract login(auth: Auth) : Promise<LoginUserResult>
}

export default AuthRepository;