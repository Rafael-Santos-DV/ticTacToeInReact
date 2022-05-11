import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { ButtonComponent } from './style';

type ButtonTypes = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export const Button: React.FC<ButtonTypes> = ({ children, ...props }) => {
  return <ButtonComponent {...props}>{children}</ButtonComponent>;
};
