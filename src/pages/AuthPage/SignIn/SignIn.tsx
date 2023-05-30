import React, { FC } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FiLock, FiLogIn, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { CustomButton } from '../../../components/CustomButton/CustomButton';
import { CustomTextInput } from '../../../components/CustomTextInput/CustomTextInput';
import { ErrorsList } from '../../../components/ErrorsList/ErrorList';
import { routes } from '../../../constants/routes';
import { Container } from '../../../containers/Container/Container';
import { SignInRequestParams } from '../../../store/auth/auth.types';
import { useAuth } from '../../../store/auth/useAuth';
import {
  AUTH_ICON_SIZE,
  FORM_METHOD,
  FORM_NO_VALIDATE,
  PASSWORD,
  PASSWORD_INPUT_TYPE,
  PASSWORD_PLACEHOLDER,
  SERVER_ERROR_MESSAGE,
  SUBMIT_BUTTON_TYPE,
} from '../authPage.settings';

import { signInValidationSchema } from './signIn.schema';

import {
  EMAIL_OR_PHONE_INPUT_TYPE,
  EMAIL_OR_PHONE,
  EMAIL_OR_PHONE_PLACEHOLDER,
  SIGN_IN_SUBMIT_BUTTON_TEXT,
} from './signIn.settings';
import { SignInFormParams } from './signIn.types';

export const SignInPage: FC = () => {
  const { signIn } = useAuth();

  const { register, handleSubmit, formState } = useForm<SignInFormParams>({
    defaultValues: {
      emailOrPhone: undefined,
      password: '',
    },
    resolver: yupResolver(signInValidationSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (values: SignInFormParams) => {
    try {
      const signInData = {
        password: values.password,
      } as SignInRequestParams;

      signInData.phoneNumber = values.emailOrPhone;
      if (values.emailOrPhone.includes('@')) {
        signInData.email = values.emailOrPhone;
      }
      await signIn(signInData);
      navigate(routes.homePage.path);
    } catch (e) {
      toast.error(SERVER_ERROR_MESSAGE);
    }
  };
  return (
    <Container>
      <div className={'mt-25'}>
        <h1 className="text-4xl text-center mb-4">Вхід</h1>
        <p className="text-center mb-4">
          <Link
            className={
              'text-swipesell-slate-700 hover:text-swipesell-slate-400'
            }
            to={routes.signUp.path}>
            Ще немає акаунта?
          </Link>
        </p>
        <form
          className="max-w-xl mx-auto flex flex-col gap-4"
          method={FORM_METHOD}
          noValidate={FORM_NO_VALIDATE}
          onSubmit={handleSubmit(onSubmit)}>
          <ErrorsList errors={formState.errors} />

          <CustomTextInput
            placeholder={EMAIL_OR_PHONE_PLACEHOLDER}
            type={EMAIL_OR_PHONE_INPUT_TYPE}
            {...register(EMAIL_OR_PHONE)}>
            <FiUser size={AUTH_ICON_SIZE} />
          </CustomTextInput>

          <CustomTextInput
            placeholder={PASSWORD_PLACEHOLDER}
            type={PASSWORD_INPUT_TYPE}
            {...register(PASSWORD)}>
            <FiLock size={AUTH_ICON_SIZE} />
          </CustomTextInput>

          <div className="flex justify-end">
            <CustomButton
              disabled={formState.isSubmitting}
              title={SIGN_IN_SUBMIT_BUTTON_TEXT}
              type={SUBMIT_BUTTON_TYPE}>
              <FiLogIn size={AUTH_ICON_SIZE} />
            </CustomButton>
          </div>
        </form>
      </div>
    </Container>
  );
};
