import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export interface CustomButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  textSize?: TextSize;
}

export enum TextSize {
  BASE = 'text-base',
  SMALL = 'text-sm',
  MEDIUM = 'text-md',
  LARGE = 'text-lg',
}
