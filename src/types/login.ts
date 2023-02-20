export interface IFormLogin {
  login: string;
  password: string;
}

export interface IFormReg {
  login: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  password2: string;
}

export interface IUserData {
  user: {
    id: string | undefined;
    email: string;
    username: string;
    isActivated: boolean | undefined;
  };
  accessToken: string;
}

export interface IUser {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}
