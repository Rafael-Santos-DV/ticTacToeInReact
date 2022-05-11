import React, { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonTypes = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export const Button: React.FC<ButtonTypes> = ({ children, ...props }) => {
  return <Button {...props}>{children}</Button>;
};
