import React, { FC, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { routes } from '../../constants/routes';
import { Container } from '../../containers/Container/Container';
import { usePageParam } from '../../hooks/usePageParam';
import {
  useGetCategoriesQuery,
  useGetCitiesQuery,
  useGetNoticesQuery,
} from '../../services/notices/noticesApi';
import {
  CitiesParams,
  NoticeQueryParams,
} from '../../store/notices/notices.types';

import { NoticeBoard } from './NoticeBoard/NoticeBoard';
import { NoticeFilters } from './NoticeFilters/NoticeFilters';

export const NoticeBoardPage: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [minPriceValue, setMinPriceValue] = useState<string>('');
  const [maxPriceValue, setMaxPriceValue] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [cities, setCities] = useState<CitiesParams[]>();
  const navigate = useNavigate();
  const pageParams = usePageParam();
  const categoriesQuery = useGetCategoriesQuery(undefined);
  const citiesQuery = useGetCitiesQuery(undefined);
  const { data, isLoading, isFetching, error } = useGetNoticesQuery({
    page: pageParams.page,
    category: pageParams.category,
    minPrice: pageParams.minPrice,
    maxPrice: pageParams.maxPrice,
    search: pageParams.search,
    city: pageParams.city,
    isPersonalNotices: false,
  } as NoticeQueryParams);

  useEffect(() => {
    setSelectedCategory(pageParams.category);
    setMinPriceValue(pageParams.minPrice.toString());
    setMaxPriceValue(pageParams.maxPrice.toString());
    setSearch(pageParams.search);
    setCity(pageParams.city);
    setCities(citiesQuery.data?.cities);
  }, [
    citiesQuery.data?.cities,
    pageParams.category,
    pageParams.city,
    pageParams.maxPrice,
    pageParams.minPrice,
    pageParams.search,
  ]);
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);
  };

  const handleSearchMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value && maxPriceValue) {
      setMinPriceValue(
        Math.min(parseInt(e.target.value), parseInt(maxPriceValue)).toString(),
      );
    }
  };
  const handleSearchMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPriceValue(e.target.value);
  };
  const handleSelectMinPriceOption = (value: string) => {
    setMinPriceValue(value);
  };
  const handleSelectMaxPriceOption = (value: string) => {
    setMaxPriceValue(value);
  };

  const handleSelectCity = (city: string) => {
    setCity(city);
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleClickNoticeItem = (id: string | undefined) => {
    navigate(`${routes.notices.path}/${id || ''}`);
  };
  return (
    <Container>
      <NoticeFilters
        categories={categoriesQuery.data?.categories || []}
        cities={cities || []}
        cityValue={city}
        maxPriceValue={maxPriceValue}
        minPriceValue={minPriceValue}
        onCategoryChange={handleCategoryChange}
        onSearch={handleSearch}
        onSearchMaxPrice={handleSearchMaxPrice}
        onSearchMinPrice={handleSearchMinPrice}
        onSelectCity={handleSelectCity}
        onSelectMaxPriceOption={handleSelectMaxPriceOption}
        onSelectMinPriceOption={handleSelectMinPriceOption}
        searchValue={search}
        selectedCategory={selectedCategory}
      />
      <NoticeBoard
        data={data}
        error={error}
        isFetching={isFetching}
        isLoading={isLoading}
        onClickItem={handleClickNoticeItem}
      />
    </Container>
  );
};
