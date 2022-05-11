import React, { useContext } from 'react';
import { BoxLogin, ContainerHome } from './style';

import imageHome from '../../assets/image-old.svg';
import google from '../../assets/google.png';
import { Button } from '../../components/Button/Button';
import { AuthContext } from '../../context/ContextAuth';

export const Home: React.FC = () => {
  const { singInWithGoogle } = useContext(AuthContext);
  return (
    <ContainerHome>
      <img src={imageHome} alt="Dois velinhos jogando o tic tac toe" />
      <BoxLogin type="button" onClick={singInWithGoogle}>
        <img src={google} alt="Google" />
        <span>Fazer Login</span>
      </BoxLogin>
      <Button type="button">Jogar</Button>
    </ContainerHome>
  );
};
