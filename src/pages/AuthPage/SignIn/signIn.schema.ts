import * as yup from 'yup';

import { MIN_PASSWORD_LENGTH } from '../authPage.settings';

const MIN_EMAIL_OR_PHONE_LENGTH = 3;
const PASSWORD_LOWER = /^(?=.*[a-z])/;
const PASSWORD_UPPER = /^(?=.*[A-Z])/;
const PASSWORD_NUMBER = /^(?=.*[0-9])/;
export const signInValidationSchema = yup.object({
  emailOrPhone: yup
    .string()
    .min(MIN_EMAIL_OR_PHONE_LENGTH, 'please enter phone number or email')
    .required(),
  password: yup
    .string()
    .required()
    .min(MIN_PASSWORD_LENGTH)
    .matches(PASSWORD_LOWER, 'must contain one lowercase character')
    .matches(PASSWORD_UPPER, 'must contain one uppercase character')
    .matches(PASSWORD_NUMBER, 'must contain one number character'),
});
