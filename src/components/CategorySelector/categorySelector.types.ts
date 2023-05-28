import { ChangeEventHandler, HTMLAttributes } from 'react';

import { CategoriesWithIcons } from '../../constants/categories';
import { CategoriesParams } from '../../store/notices/notices.types';

export interface CategorySelectorProps
  extends HTMLAttributes<HTMLSelectElement> {
  categories?: CategoriesWithIcons[] | CategoriesParams[];
  classContainer?: string;
  selectedCategory: string;
  value?: string;
  required?: boolean;
  name?: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
}
