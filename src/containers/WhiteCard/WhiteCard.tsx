import { FC, PropsWithChildren } from 'react';

import { ContainerProps } from 'react-bootstrap';

export const WhiteCard: FC<PropsWithChildren<ContainerProps>> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`px-5 py-5 rounded-2xl flex bg-white mx-auto h-full ${className}`}>
      {children}
    </div>
  );
};
