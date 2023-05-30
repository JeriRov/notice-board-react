import React, { FC } from 'react';

import { AppLoader } from '../../../components/AppLoader/AppLoader';
import { CustomButton } from '../../../components/CustomButton/CustomButton';
import { TextSize } from '../../../components/CustomButton/customButton.types';
import { useGetCategoriesQuery } from '../../../services/notices/noticesApi';
import { TitleIcon } from '../TitleIcon/TitleIcon';
import { FORM_ACTION_NOTICES } from '../homePage.settings';

import {
  CATEGORY_BUTTON_NAME,
  CATEGORY_FORM_METHOD,
  TITLE_ICON_SIZE,
} from './homePageCategories.settings';

export const HomePageCategories: FC = () => {
  const { data, isLoading, isFetching, error } =
    useGetCategoriesQuery(undefined);

  if (isLoading || isFetching) {
    return (
      <div className={'w-full flex items-center justify-center'}>
        <AppLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-conduit-gray-100 p-3 pt-1.5 w-full flex items-center justify-center">
        <p className="mb-2">Помилка під час завантаження категорій...</p>
      </div>
    );
  }

  return (
    <div className={'text-center w-full flex items-center flex-col'}>
      <h1 className={'text-4xl mb-14 font-poppins'}>Категорії</h1>
      <form action={FORM_ACTION_NOTICES} method={CATEGORY_FORM_METHOD}>
        <ul className={'grid grid-cols-4'}>
          {data?.categories.map(category => (
            <li key={category._id}>
              <CustomButton
                className={'min-w-[12rem] max-w-[12rem] mx-12 my-3'}
                name={CATEGORY_BUTTON_NAME}
                textSize={TextSize.SMALL}
                title={category.name}
                value={category.name}>
                <TitleIcon size={TITLE_ICON_SIZE} title={category.name} />
              </CustomButton>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
};
