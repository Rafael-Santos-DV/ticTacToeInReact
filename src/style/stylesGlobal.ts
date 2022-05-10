import styled, { createGlobalStyle } from 'styled-components';
import Colors from './colors';

export const StylesGlobal = createGlobalStyle`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
  text-decoration: none;

  html, body {
    background: ${Colors.backgroundMaster};
  }
`;

export const Container = styled.div``;
