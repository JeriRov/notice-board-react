import { FC } from 'react';

import { ErrorsListProps } from './errorList.types';

export const ErrorsList: FC<ErrorsListProps> = ({ errors }) => {
  return (
    <ul className="list-disc pl-10">
      {(Object.keys(errors) as (keyof typeof errors)[]).map(field => (
        <li
          className="text-swipesell-red-500 font-bold"
          key={`error-${String(field)}`}>
          {errors[String(field)]?.message as string}
        </li>
      ))}
    </ul>
  );
};
