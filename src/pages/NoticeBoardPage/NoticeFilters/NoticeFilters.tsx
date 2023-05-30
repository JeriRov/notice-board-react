import React, { FC } from 'react';

import { FiSearch } from 'react-icons/fi';

import { CategorySelector } from '../../../components/CategorySelector/CategorySelector';
import { CitySearchSelector } from '../../../components/CitySearchSelector/CitySearchSelector';
import { CustomButton } from '../../../components/CustomButton/CustomButton';
import { CustomTextInput } from '../../../components/CustomTextInput/CustomTextInput';
import { DropDownSearchSelector } from '../../../components/DropDownSearchSelctor/DropDownSearchSelector';

import { OPTIONS } from './noticeFilters.settings';
import { NoticeFiltersProps } from './noticeFilters.types';

export const NoticeFilters: FC<NoticeFiltersProps> = ({
  categories,
  minPriceValue,
  maxPriceValue,
  onCategoryChange: handleCategoryChange,
  onSearchMaxPrice: handleSearchMaxPrice,
  onSearchMinPrice: handleSearchMinPrice,
  onSelectMaxPriceOption: handleSelectMaxPriceOption,
  onSelectMinPriceOption: handleSelectMinPriceOption,
  selectedCategory,
  cities,
  onSearch: handleSearch,
  onSelectCity: handleSelectCity,
  cityValue,
  searchValue,
}) => {
  return (
    <div className={'w-full px-32 p-10'}>
      <form>
        <div className={'flex mb-4 gap-1'}>
          <CustomTextInput
            className={'w-full'}
            name={'search'}
            onChange={handleSearch}
            placeholder={'Search'}
            value={searchValue}>
            <FiSearch size={28} />
          </CustomTextInput>

          <CitySearchSelector
            cities={cities}
            name={'city'}
            onSelectCity={handleSelectCity}
            value={cityValue}
          />

          <CustomButton title={'Пошук'} type={'submit'}>
            <FiSearch size={28} />
          </CustomButton>
        </div>

        <div className={'flex gap-3 items-center'}>
          <CategorySelector
            categories={categories}
            className={'w-full'}
            name={'category'}
            onChange={handleCategoryChange}
            selectedCategory={selectedCategory}
          />
          <div className={'flex gap-2'}>
            <DropDownSearchSelector
              list={'minPrice'}
              min={0}
              name={'minPrice'}
              onChange={handleSearchMinPrice}
              onSelectOption={handleSelectMinPriceOption}
              options={OPTIONS}
              placeholder="Мінімальна ціна"
              type="number"
              value={minPriceValue}>
              <span className={'text-xl'}>Від:</span>
            </DropDownSearchSelector>

            <DropDownSearchSelector
              list={'maxPrice'}
              min={0}
              name={'maxPrice'}
              onChange={handleSearchMaxPrice}
              onSelectOption={handleSelectMaxPriceOption}
              options={OPTIONS}
              placeholder="Максимальна ціна"
              type="number"
              value={maxPriceValue}>
              <span className={'text-xl'}>До:</span>
            </DropDownSearchSelector>
          </div>
        </div>
      </form>
    </div>
  );
};
