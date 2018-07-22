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
    UserName: string;
    Token: string;
}
export interface IuserResetPassword {
    UserName: string;
    Token: string;
    NewPassword: string;
}