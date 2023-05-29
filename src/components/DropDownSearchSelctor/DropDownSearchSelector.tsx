import { FC } from 'react';

import { CustomTextInput } from '../CustomTextInput/CustomTextInput';

import { DropDownSearchSelectorProps } from './dropDownSearchSelector.types';

export const DropDownSearchSelector: FC<DropDownSearchSelectorProps> = ({
  options,
  children,
  onSelectOption: handleSelectOption,
  list,
  ...props
}) => {
  return (
    <div>
      <CustomTextInput list={list} {...props}>
        {children}
      </CustomTextInput>
      <datalist
        className={
          'absolute max-h-20 border-0 overflow-x-hidden overflow-y-auto'
        }
        id={list}>
        className=
        {`block appearance-none w-full bg-white text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white`}
        {options.map((option, index) => (
          <option
            className={
              'text-xs p-0.3 bg-blue-300 cursor-pointer hover:text-white hover:bg-blue-500 hover:outline-none'
            }
            key={index}
            onClick={() => handleSelectOption(option)}
            value={option}>
            {option}
          </option>
        ))}
      </datalist>
    </div>
  );
};
