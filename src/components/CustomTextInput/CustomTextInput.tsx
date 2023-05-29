import React, { forwardRef } from 'react';

import { DEFAULT_INPUT_TYPE } from './customTextInput.settings';
import { CustomTextInputProps } from './customTextInput.types';

export const CustomTextInput = forwardRef<
  HTMLInputElement,
  CustomTextInputProps
>(({ children, title, className, type, ...props }, ref) => {
  return (
    <div className={className}>
      {title}
      <div className="relative text-gray-600 focus-within:text-gray-400">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          {children}
        </span>
        <input
          ref={ref}
          {...props}
          autoComplete="off"
          className="py-5 w-full text-base text-swipesell-slate-400 bg-white pl-16 focus:outline-none focus:text-swipesell-slate-800 rounded"
          type={!type ? DEFAULT_INPUT_TYPE : type}
        />
      </div>
    </div>
  );
});
