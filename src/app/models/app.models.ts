export class RegisterUser{
  constructor(
    public Email: string,
    public Password: string,
    public ConfirmPassword: string
  ) {
  }
}

export class LoginUser{
  constructor(
    public UserName: string,
    public Password: string
  ) {
  }
}

export class Users {
  constructor(
    public Email: string,
    public UserName: string
  ){}
}
export class ApplicationRole {
  constructor(
    public Name: string,
    public NormalizedName: string
  ){}
}
export class UserRole {
  constructor(
    public UserName: string,
    public RoleName: string
  ){}
}
export class ResponseStatus {
  constructor(
    public StatusCode: number,
    public Message: string,
    public Token: string,
    public Role: string,
    public UserName: string
  ){}
}
export enum LoginStatus {
  NoRoleToUser = 0,
  LoginFailed = 1,
  LoginSuccessful = 2
}

export enum Roles {
  Administrator = 'Administrator',
  Manager = 'Manager',
  Clerk = 'Clerk'
}

export class AuthStatus {
   constructor(
     // tslint:disable-next-line: no-shadowed-variable
     public LoginStatus: LoginStatus,
     public Token: string
   ){}
}
