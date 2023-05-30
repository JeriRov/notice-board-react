import React from 'react';

import {
  CategoriesParams,
  CitiesParams,
} from '../../../store/notices/notices.types';

export interface NoticeFiltersProps {
  categories: CategoriesParams[];
  minPriceValue: string;
  maxPriceValue: string;
  onCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSearchMaxPrice: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchMinPrice: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectMaxPriceOption: (value: string) => void;
  onSelectMinPriceOption: (value: string) => void;
  selectedCategory: string;
  cities: CitiesParams[];
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectCity: (city: string) => void;
  cityValue: string;
  searchValue: string;
}
