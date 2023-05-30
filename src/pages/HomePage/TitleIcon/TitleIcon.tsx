import React, { FC } from 'react';

import { FiHelpCircle } from 'react-icons/fi';

import { CATEGORIES } from '../../../constants/categories';

import { ITitleIcon } from './titleIcon.types';

export const TitleIcon: FC<ITitleIcon> = ({ title, ...props }) => {
  const category = CATEGORIES.find(category => category.name === title);
  if (!category) {
    return <FiHelpCircle {...props} />;
  }
  const Icon = category ? category.icon : null;

  return Icon ? <Icon {...props} /> : null;
};
