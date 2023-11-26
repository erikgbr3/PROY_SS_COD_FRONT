import User from "../../../users/domain/entities/user";
import Auth from "./auth";

class LoginUserResult{
  auth: Auth[];
  message: string;
  token: string;
  user: User;
  error?: boolean;
  errors?:{
    error: string,
    field: string
  }[] | null;
  constructor(
    auth: Auth[],
    message: string,
    token: string,
    user: User,
  ){
    this.auth = auth,
    this.message = message
    this.token = token
    this.user = user
  }
}

export default LoginUserResult;