import React, { useEffect, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { BoxLogin, ButtonForm, CardForm, ContainerHome } from './style';

import imageHome from '../../assets/image-old.svg';
import google from '../../assets/google.png';
import { Button } from '../../components/Button/Button';
import { database } from '../../services/firebase';
import { useAuth } from '../../hooks/useAuth';

export const Home: React.FC = () => {
  const { user, singInWithGoogle } = useAuth();
  const [login, setLogin] = useState(false);
  const [card, setCard] = useState<'create' | 'singIn' | undefined>();
  const [nameOrCodRoom, setNameOrCodRoom] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setLogin(true);
    }
  }, [user]);

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (nameOrCodRoom.trim() === '') return;

    const roomRefGame = database.ref('gameRooms');

    const databaseRoomValue = await roomRefGame.push({
      nameRoom: nameOrCodRoom.trim(),
      author: {
        user: user?.user,
        id: user?.id,
        avatar: user?.avatar,
      },
      anotations: {
        jogadorInit: 'creator',
        creator: {
          user: user?.user,
          avatar: user?.avatar,
          id: user?.id,
          wins: 0,
          plays: '',
        },
        // quest: {
        //   user: '',
        //   avatar: '',
        //   id: '',
        //   wins: 0,
        //   plays: [],
        // },
      },
    });

    navigate(`/game/${databaseRoomValue.key}`);
  }

  async function handleSignInRoom(event: FormEvent) {
    event.preventDefault();

    if (nameOrCodRoom.trim() === '') return;

    const roomRefGame = database.ref(`gameRooms/${nameOrCodRoom.trim()}`);
    const result = await roomRefGame.get();
    const anotationsResult = result.val();

    if (anotationsResult.anotations.quest) {
      window.alert('Já tem dois jogadores!');
      return;
    }

    const { anotations } = anotationsResult;

    if (anotations.creator.id === user?.id) {
      window.alert('Entrando na sala...');
      navigate(`game/${result.key}`);
      return;
    }

    const quest = {
      user: user?.user,
      avatar: user?.avatar,
      id: user?.id,
      wins: 0,
      plays: '',
    };

    const newData = {
      ...anotationsResult.anotations,
      quest,
    };

    anotationsResult.anotations = newData;

    await roomRefGame.update(anotationsResult);
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
