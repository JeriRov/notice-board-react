import { SignUpRequestParams } from '../../../store/auth/auth.types';

export interface SignUpFormParams extends SignUpRequestParams {
  confirmPassword?: string;
}
