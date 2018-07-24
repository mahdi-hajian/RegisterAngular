export interface Iuser {
  UserName: string;
  Password: string;
  Email: string;
  FirstName: string;
  LastName: string;
}
export interface IuserLogin {
  UserName: string;
  Password: string;
  Ip: string;
}
export interface IuserConfirmEmail {
  UserId  : string;
  Token: string;
}
export interface IuserResetPassword {
  UserId: string;
  NewPassword: string;
}
export interface IuserChangePassword {
  CurrentPassword: string;
  NewPassword: string;
}
export interface IuserChangeEmail {
  NewEmail: string;
  UserId: string;
}
