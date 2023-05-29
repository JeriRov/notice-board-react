import { ReactNode } from 'react';

import { CustomTextInputProps } from '../CustomTextInput/customTextInput.types';

export interface DropDownSearchSelectorProps extends CustomTextInputProps {
  options: string[];
  children?: ReactNode;
  onSelectOption: (option: string) => void;
}
