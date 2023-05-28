import { FC } from 'react';

export const AppLoader: FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full border-t-4 border-b-4 border-gray-900 h-16 w-16" />
    </div>
  );
};
