import React from 'react';
import { BoxLogin, ContainerHome } from './style';

import imageHome from '../../assets/image-old.svg';
import google from '../../assets/google.png';
import { Button } from '../../components/Button/Button';

export const Home: React.FC = () => {
  return (
    <ContainerHome>
      <img src={imageHome} alt="Dois velinhos jogando o tic tac toe" />
      <BoxLogin type="button">
        <img src={google} alt="Google" />
        <span>Fazer Login</span>
      </BoxLogin>
      <Button>Jogar</Button>
    </ContainerHome>
  );
};
