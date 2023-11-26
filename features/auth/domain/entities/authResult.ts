import Auth from "./auth";

class AuthResult{
  auth: Auth[];
  constructor(auth:Auth[]){
    this.auth = auth;
  }
}

export default AuthResult;