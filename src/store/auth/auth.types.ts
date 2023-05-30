export enum AuthEndpoints {
  LOGIN = '/auth/login',
  REGISTER = '/auth/register',
}

export interface SignInRequestParams {
  phoneNumber?: string;
  email?: string;
  password: string;
}

export interface SignUpRequestParams {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
  password: string;
  avatar: string;
}

export interface AuthResponseParams {
  id: string;
  accessToken: string;
  firstName: string;
  cityId?: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
  avatar: string;
}

export interface AuthState {
  user: AuthResponseParams | null;
}
