import React, { FC, useEffect } from 'react';

import { FiSearch } from 'react-icons/fi';

import { CitySearchSelector } from '../../components/CitySearchSelector/CitySearchSelector';
import { CustomButton } from '../../components/CustomButton/CustomButton';
import { CustomTextInput } from '../../components/CustomTextInput/CustomTextInput';
import { WhiteCard } from '../../containers/WhiteCard/WhiteCard';
import { useGetCitiesQuery } from '../../services/notices/noticesApi';
import { CitiesParams } from '../../store/notices/notices.types';

import { HomePageCategories } from './HomePageCategories/HomePageCategories';

import {
  CITY_INPUT_NAME,
  FORM_ACTION_NOTICES,
  SEARCH_BUTTON_ICON_SIZE,
  SEARCH_BUTTON_TITLE,
  SEARCH_BUTTON_TYPE,
  SEARCH_FORM_METHOD,
  SEARCH_INPUT_ICON_SIZE,
  SEARCH_INPUT_NAME,
  SEARCH_INPUT_PLACEHOLDER,
} from './homePage.settings';

export const HomePage: FC = () => {
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [cityValue, setCityValue] = React.useState<string>('');
  const [cities, setCities] = React.useState<CitiesParams[]>();
  const citiesQuery = useGetCitiesQuery(undefined);

  useEffect(() => {
    setCities(citiesQuery.data?.cities);
  }, [citiesQuery.data]);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  const handleSelectCity = (city: string) => {
    setCityValue(city);
  };

  return (
    <div className={'w-full'}>
      <form action={FORM_ACTION_NOTICES} method={SEARCH_FORM_METHOD}>
        <div className={'p-10 px-64 flex gap-1'}>
          <CustomTextInput
            className={'w-full'}
            name={SEARCH_INPUT_NAME}
            onChange={handleSearch}
            placeholder={SEARCH_INPUT_PLACEHOLDER}
            value={searchValue}>
            <FiSearch size={SEARCH_INPUT_ICON_SIZE} />
          </CustomTextInput>

          <CitySearchSelector
            cities={cities}
            name={CITY_INPUT_NAME}
            onSelectCity={handleSelectCity}
            value={cityValue}
          />
          <CustomButton title={SEARCH_BUTTON_TITLE} type={SEARCH_BUTTON_TYPE}>
            <FiSearch size={SEARCH_BUTTON_ICON_SIZE} />
          </CustomButton>
        </div>
      </form>
      <WhiteCard>
        <HomePageCategories />
      </WhiteCard>
    </div>
  );
};
