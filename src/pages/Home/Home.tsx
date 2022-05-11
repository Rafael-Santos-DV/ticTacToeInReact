import React, { useContext, useEffect, useState } from 'react';
import { BoxLogin, ButtonForm, CardForm, ContainerHome } from './style';

import imageHome from '../../assets/image-old.svg';
import google from '../../assets/google.png';
import { Button } from '../../components/Button/Button';
import { AuthContext } from '../../context/ContextAuth';

export const Home: React.FC = () => {
  const { user, singInWithGoogle } = useContext(AuthContext);
  const [login, setLogin] = useState(false);
  const [card, setCard] = useState<'create' | 'singIn' | undefined>();

  useEffect(() => {
    if (user) {
      setLogin(true);
    }
  }, [user]);

  return (
    <ContainerHome>
      <img src={imageHome} alt="Dois velinhos jogando o tic tac toe" />
      {!login && (
        <BoxLogin type="button" onClick={singInWithGoogle}>
          <img src={google} alt="Google" />
          <span>Fazer Login</span>
        </BoxLogin>
      )}

      <Button type="button" onClick={() => setCard('singIn')} disabled={!login}>
        Jogar
      </Button>

      {login && (
        <Button type="button" createRoom onClick={() => setCard('create')}>
          Criar Sala
        </Button>
      )}

      {card === 'create' && (
        <CardForm>
          <strong>Nome da sala</strong>
          <input type="text" />
          <ButtonForm arial-aria-label="Criar sala" type="submit">
            Criar Sala
          </ButtonForm>
        </CardForm>
      )}

      {card === 'singIn' && (
        <CardForm>
          <strong>Código da sala</strong>
          <input type="text" />
          <ButtonForm arial-aria-label="Entrar na sala" type="submit" active>
            Entrar na sala
          </ButtonForm>
        </CardForm>
      )}
    </ContainerHome>
  );
};
