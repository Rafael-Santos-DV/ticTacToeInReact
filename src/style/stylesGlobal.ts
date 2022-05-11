import styled, { createGlobalStyle } from 'styled-components';
import Colors from './colors';

export const StylesGlobal = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    text-decoration: none;
    font-family: 'Viga', sans-serif;
  }

  html, body, #root {
    background: ${Colors.backgroundMaster};
    height: 100%;
  }
`;

export const Container = styled.div``;
