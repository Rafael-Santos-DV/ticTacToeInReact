import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { ButtonComponent } from './style';

type ButtonTypes = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  createRoom?: boolean;
};

export const Button: React.FC<ButtonTypes> = ({ children, ...props }) => {
  return <ButtonComponent {...props}>{children}</ButtonComponent>;
};
