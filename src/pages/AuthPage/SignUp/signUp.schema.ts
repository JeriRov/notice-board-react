import * as yup from 'yup';

import { MIN_PASSWORD_LENGTH } from '../authPage.settings';

const MIN_FIRST_NAME_LENGTH = 3;
const MIN_LAST_NAME_LENGTH = 3;
const MIN_PHONE_NUMBER_LENGTH = 13;
const PASSWORD_LOWER = /^(?=.*[a-z])/;
const PASSWORD_UPPER = /^(?=.*[A-Z])/;
const PASSWORD_NUMBER = /^(?=.*[0-9])/;

export const signUpValidationSchema = yup.object({
  firstName: yup.string().required().min(MIN_FIRST_NAME_LENGTH),
  lastName: yup.string().required().min(MIN_LAST_NAME_LENGTH),
  email: yup.string().email().optional(),
  phoneNumber: yup.string().required().min(MIN_PHONE_NUMBER_LENGTH),
  password: yup
    .string()
    .required()
    .min(MIN_PASSWORD_LENGTH)
    .matches(PASSWORD_LOWER, 'must contain one lowercase character')
    .matches(PASSWORD_UPPER, 'must contain one uppercase character')
    .matches(PASSWORD_NUMBER, 'must contain one number character'),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'passwords must match'),
});
