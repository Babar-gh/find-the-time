interface IUserCredentials {
  email: string;
  password: string;
}

export interface IUserCreationRequest extends IUserCredentials {}
export interface IUserLoginRequest extends IUserCredentials {}

export interface IUserNameChangeRequest {
  name: string;
}
