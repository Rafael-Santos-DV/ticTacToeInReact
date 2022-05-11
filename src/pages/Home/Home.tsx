import React, { useContext, useEffect, useState, FormEvent } from 'react';
import { BoxLogin, ButtonForm, CardForm, ContainerHome } from './style';

import imageHome from '../../assets/image-old.svg';
import google from '../../assets/google.png';
import { Button } from '../../components/Button/Button';
import { AuthContext } from '../../context/ContextAuth';

export const Home: React.FC = () => {
  const { user, singInWithGoogle } = useContext(AuthContext);
  const [login, setLogin] = useState(false);
  const [card, setCard] = useState<'create' | 'singIn' | undefined>();
  const [nameOrCodRoom, setNameOrCodRoom] = useState('');

  useEffect(() => {
    if (user) {
      setLogin(true);
    }
  }, [user]);

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
  }

  async function handleSignInRoom(event: FormEvent) {
    event.preventDefault();
  }

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
        <CardForm onSubmit={handleCreateRoom}>
          <strong>Nome da sala</strong>
          <input
            type="text"
            onChange={(e) => setNameOrCodRoom(e.target.value)}
            value={nameOrCodRoom}
          />
          <ButtonForm arial-aria-label="Criar sala" type="submit">
            Criar Sala
          </ButtonForm>
        </CardForm>
      )}

      {card === 'singIn' && (
        <CardForm onSubmit={handleSignInRoom}>
          <strong>Código da sala</strong>
          <input
            type="text"
            onChange={(e) => setNameOrCodRoom(e.target.value)}
            value={nameOrCodRoom}
          />
          <ButtonForm arial-aria-label="Entrar na sala" type="submit" active>
            Entrar na sala
          </ButtonForm>
        </CardForm>
      )}
    </ContainerHome>
  );
};
