import { useSearchParams } from 'react-router-dom';

import { serializeSearchParams } from '../utils/router';

export const usePageParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';
  const city = searchParams.get('city') || '';

  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 0;
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';

  const setPage = (page: number) => {
    setSearchParams(serializeSearchParams({ page: String(page) }));
  };
  const setCategory = (category: string) => {
    setSearchParams(serializeSearchParams({ category }));
  };
  const setMinPrice = (minPrice: number) => {
    setSearchParams(serializeSearchParams({ minPrice: String(minPrice) }));
  };
  const setMaxPrice = (maxPrice: number) => {
    setSearchParams(serializeSearchParams({ maxPrice: String(maxPrice) }));
  };
  const setSearch = (search: string) => {
    setSearchParams(serializeSearchParams({ search }));
  };
  const setCity = (city: string) => {
    setSearchParams(serializeSearchParams({ city }));
  };

  return {
    page,
    category,
    search,
    city,
    maxPrice,
    minPrice,
    setPage,
    setCategory,
    setSearch,
    setCity,
    setMaxPrice,
    setMinPrice,
  };
};
