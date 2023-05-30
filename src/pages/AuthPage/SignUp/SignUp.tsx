import React, { FC } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FiLock, FiLogIn, FiMail, FiUser, FiPhone } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { CustomButton } from '../../../components/CustomButton/CustomButton';
import { CustomTextInput } from '../../../components/CustomTextInput/CustomTextInput';
import { ErrorsList } from '../../../components/ErrorsList/ErrorList';
import { routes } from '../../../constants/routes';
import { Container } from '../../../containers/Container/Container';
import { SignUpRequestParams } from '../../../store/auth/auth.types';
import { useAuth } from '../../../store/auth/useAuth';
import {
  FORM_METHOD,
  FORM_NO_VALIDATE,
  AUTH_ICON_SIZE,
  PASSWORD,
  PASSWORD_INPUT_TYPE,
  PASSWORD_PLACEHOLDER,
  SUBMIT_BUTTON_TYPE,
  SERVER_ERROR_MESSAGE,
} from '../authPage.settings';

import { signUpValidationSchema } from './signUp.schema';

import {
  CONFIRM_PASSWORD,
  CONFIRM_PASSWORD_INPUT_TYPE,
  CONFIRM_PASSWORD_PLACEHOLDER,
  EMAIL,
  EMAIL_INPUT_TYPE,
  EMAIL_PLACEHOLDER,
  FIRST_NAME,
  FIRST_NAME_INPUT_TYPE,
  FIRST_NAME_PLACEHOLDER,
  LAST_NAME,
  LAST_NAME_INPUT_TYPE,
  LAST_NAME_PLACEHOLDER,
  PHONE_NUMBER,
  PHONE_NUMBER_INPUT_TYPE,
  PHONE_NUMBER_PLACEHOLDER,
  SIGN_UP_SUBMIT_BUTTON_TEXT,
} from './signUp.settings';
import { SignUpFormParams } from './signUp.types';

export const SignUpPage: FC = () => {
  const { signUp } = useAuth();

  const { register, handleSubmit, formState } = useForm<SignUpFormParams>({
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(signUpValidationSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (values: SignUpRequestParams) => {
    try {
      if (values.email === '') delete values.email;
      await signUp(values);
      navigate('/');
    } catch (e) {
      toast.error(SERVER_ERROR_MESSAGE);
    }
  };
  return (
    <Container>
      <div className={'mt-2'}>
        <h1 className="text-4xl text-center mb-4">Реєстрація</h1>
        <p className="text-center mb-4">
          <Link
            className={
              'text-swipesell-slate-700 hover:text-swipesell-slate-400'
            }
            to={routes.signIn.path}>
            Уже є акаунт?
          </Link>
        </p>
        <form
          className="max-w-xl mx-auto flex flex-col gap-4"
          method={FORM_METHOD}
          noValidate={FORM_NO_VALIDATE}
          onSubmit={handleSubmit(onSubmit)}>
          <ErrorsList errors={formState.errors} />
          <CustomTextInput
            placeholder={FIRST_NAME_PLACEHOLDER}
            type={FIRST_NAME_INPUT_TYPE}
            {...register(FIRST_NAME)}>
            <FiUser size={AUTH_ICON_SIZE} />
          </CustomTextInput>

          <CustomTextInput
            placeholder={LAST_NAME_PLACEHOLDER}
            type={LAST_NAME_INPUT_TYPE}
            {...register(LAST_NAME)}>
            <FiUser size={AUTH_ICON_SIZE} />
          </CustomTextInput>

          <CustomTextInput
            placeholder={PHONE_NUMBER_PLACEHOLDER}
            type={PHONE_NUMBER_INPUT_TYPE}
            {...register(PHONE_NUMBER)}>
            <FiPhone size={AUTH_ICON_SIZE} />
          </CustomTextInput>

          <CustomTextInput
            placeholder={EMAIL_PLACEHOLDER}
            type={EMAIL_INPUT_TYPE}
            {...register(EMAIL)}>
            <FiMail size={AUTH_ICON_SIZE} />
          </CustomTextInput>

          <CustomTextInput
            placeholder={PASSWORD_PLACEHOLDER}
            type={PASSWORD_INPUT_TYPE}
            {...register(PASSWORD)}>
            <FiLock size={AUTH_ICON_SIZE} />
          </CustomTextInput>

          <CustomTextInput
            placeholder={CONFIRM_PASSWORD_PLACEHOLDER}
            type={CONFIRM_PASSWORD_INPUT_TYPE}
            {...register(CONFIRM_PASSWORD)}>
            <FiLock size={AUTH_ICON_SIZE} />
          </CustomTextInput>

          <div className="flex justify-end">
            <CustomButton
              disabled={formState.isSubmitting}
              title={SIGN_UP_SUBMIT_BUTTON_TEXT}
              type={SUBMIT_BUTTON_TYPE}>
              <FiLogIn size={AUTH_ICON_SIZE} />
            </CustomButton>
          </div>
        </form>
      </div>
    </Container>
  );
};
