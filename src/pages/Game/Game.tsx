import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { BoxUser } from '../../components/BoxUser/BoxUser';
import { ButtonComponent } from '../../components/Button/style';
import { useAuth } from '../../hooks/useAuth';
import 'react-toastify/dist/ReactToastify.css';

import copy from '../../assets/copy.svg';
import frameGreen from '../../assets/frame-green.svg';
import frameWhite from '../../assets/frame-white.svg';

import {
  BoxMatch,
  CardGame,
  ContainerClicks,
  ContainerFrameGreen,
  ContainerFrameWhite,
  ContainerGamer,
  ContainerScore,
  ImgFrame,
  Playes,
  Score,
} from './style';
import { database } from '../../services/firebase';

type TypeMatchs = {
  one: string;
  two: string;
  three: string;
  four: string;
  five: string;
  six: string;
  seven: string;
  eigth: string;
  nine: string;
};

type TypeData = {
  author: {
    avatar: string;
    user: string;
    id: string;
  };
  nameRoom: string;
  anotations: {
    jogadorInit: string;
    creator: {
      user: string;
      id: string;
      plays: Array<string>;
      wins: number;
      avatar: string;
    };
    quest: {
      user: string;
      id: string;
      plays: Array<string>;
      wins: number;
      avatar: string;
    };
  };
};

export const Game: React.FC = () => {
  const { user } = useAuth();
  const params = useParams();
  const [data, setData] = useState<TypeData>();

  const [dataMatch, setMatch] = useState<TypeMatchs>({
    one: '',
    two: '',
    three: '',
    four: '',
    five: '',
    six: '',
    seven: '',
    eigth: '',
    nine: '',
  });

  useEffect(() => {
    (async () => {
      const roomRef = database.ref(`gameRooms/${params.id}`);
      const result: TypeData = await (await roomRef.get()).val();
      setData(result);

      const { anotations } = result;
      anotations.creator.plays?.forEach((key) => {
        if (key !== 'init') {
          setMatch((value) => ({ ...value, [key]: 'X' }));
        }
      });

      anotations.quest?.plays?.forEach((key) => {
        if (key !== 'init') {
          setMatch((value) => ({ ...value, [key]: 'O' }));
        }
      });
    })();
  }, [params.id]);

  async function handlePlayesOfUser(match: string, userId?: string) {
    const roomRef = database.ref(`gameRooms/${params.id}`);
    const response = await roomRef.get();
    const values: TypeData = response.val();

    // Creator
    if (data?.author.id === userId) {
      let { plays: PlaysCreator } = values.anotations.creator;
      const { plays: PlaysQuest } = values.anotations.quest;
      const { jogadorInit } = values.anotations;

      if (jogadorInit !== user?.id) {
        toast.error('Não é sua vez!');
        return;
      }

      const verifyIfIsArrayInit = PlaysCreator.includes('init');

      if (verifyIfIsArrayInit) {
        PlaysCreator = [];
      }

      const verifyArrayCreatorAndQuest =
        PlaysCreator.includes(match) || PlaysQuest.includes(match);

      if (verifyArrayCreatorAndQuest) {
        console.log(verifyArrayCreatorAndQuest);
        toast.warn('Já existe!');
        return;
      }

      PlaysCreator.push(match);
      values.anotations.jogadorInit = values.anotations.quest.id;
      values.anotations.creator.plays = PlaysCreator;
      await roomRef.update(values);
      setMatch((value) => ({ ...value, [match]: 'X' }));

      //
    } else {
      // Quest
      const { plays: PlaysCreator } = values.anotations.creator;
      let { plays: PlaysQuest } = values.anotations.quest;
      const { jogadorInit } = values.anotations;

      if (jogadorInit !== user?.id) {
        toast.error('Não é sua vez!');
        return;
      }

      const verifyIfIsArrayInit = PlaysQuest.includes('init');

      if (verifyIfIsArrayInit) {
        PlaysQuest = [];
      }

      const verifyArrayCreatorAndQuest =
        PlaysCreator.includes(match) || PlaysQuest.includes(match);

      if (verifyArrayCreatorAndQuest) {
        console.log(verifyArrayCreatorAndQuest);
        toast.warn('Já existe!');
        return;
      }

      PlaysQuest.push(match);
      values.anotations.jogadorInit = values.anotations.creator.id;
      values.anotations.quest.plays = PlaysQuest;
      await roomRef.update(values);
      setMatch((value) => ({ ...value, [match]: 'O' }));
    }
  }

  return (
    <div className="container-master">
      <ContainerGamer>
        <ContainerScore>
          <BoxUser
            src={data?.anotations.creator.avatar}
            name={data?.anotations.creator.user}
            match="X"
            player={1}
          />

          <Score>
            <div>
              <span>{data?.anotations.creator.wins}</span>
              <span className="wins">Vitórias</span>
              <span>{data?.anotations.quest.wins}</span>
            </div>
            <strong>vs</strong>
          </Score>

          <BoxUser
            src={data?.anotations.quest.avatar}
            name={data?.anotations.quest.user}
            match="O"
            player={2}
          />
        </ContainerScore>

        <ContainerClicks>
          <ButtonComponent className="down-room">Encerrar sala</ButtonComponent>
          <ButtonComponent className="copy">
            <img src={copy} alt="copiar" />
            <div>
              SALA # <span>{params.id}</span>
            </div>
          </ButtonComponent>
          <ButtonComponent className="game-again">
            Jogar Novamente
          </ButtonComponent>
        </ContainerClicks>

        <CardGame>
          <ContainerFrameGreen>
            <ImgFrame src={frameGreen} alt="frame green horizontal" />
            <ImgFrame src={frameGreen} alt="frame green horizontal" />
          </ContainerFrameGreen>

          <ContainerFrameWhite>
            <ImgFrame src={frameWhite} alt="frame white vertical" />
            <ImgFrame src={frameWhite} alt="frame white vertical" />
          </ContainerFrameWhite>

          <BoxMatch>
            <Playes
              aria-label="Jogada do usuário"
              onClick={() => handlePlayesOfUser('one', user?.id)}
              key="one"
              user={dataMatch.one === 'X' ? 'creator' : 'quest'}
            >
              {dataMatch.one}
            </Playes>
            <Playes
              aria-label="Jogada do usuário"
              onClick={() => handlePlayesOfUser('two', user?.id)}
              key="two"
              user={dataMatch.two === 'X' ? 'creator' : 'quest'}
            >
              {dataMatch.two}
            </Playes>
            <Playes
              aria-label="Jogada do usuário"
              onClick={() => handlePlayesOfUser('three', user?.id)}
              key="three"
              user={dataMatch.three === 'X' ? 'creator' : 'quest'}
            >
              {dataMatch.three}
            </Playes>
            <Playes
              aria-label="Jogada do usuário"
              onClick={() => handlePlayesOfUser('four', user?.id)}
              key="four"
              user={dataMatch.four === 'X' ? 'creator' : 'quest'}
            >
              {dataMatch.four}
            </Playes>
            <Playes
              aria-label="Jogada do usuário"
              onClick={() => handlePlayesOfUser('five', user?.id)}
              key="five"
              user={dataMatch.five === 'X' ? 'creator' : 'quest'}
            >
              {dataMatch.five}
            </Playes>
            <Playes
              aria-label="Jogada do usuário"
              onClick={() => handlePlayesOfUser('six', user?.id)}
              key="six"
              user={dataMatch.six === 'X' ? 'creator' : 'quest'}
            >
              {dataMatch.six}
            </Playes>
            <Playes
              aria-label="Jogada do usuário"
              onClick={() => handlePlayesOfUser('seven', user?.id)}
              key="seven"
              user={dataMatch.seven === 'X' ? 'creator' : 'quest'}
            >
              {dataMatch.seven}
            </Playes>
            <Playes
              aria-label="Jogada do usuário"
              onClick={() => handlePlayesOfUser('eigth', user?.id)}
              key="eigth"
              user={dataMatch.eigth === 'X' ? 'creator' : 'quest'}
            >
              {dataMatch.eigth}
            </Playes>
            <Playes
              aria-label="Jogada do usuário"
              onClick={() => handlePlayesOfUser('nine', user?.id)}
              user={dataMatch.nine === 'X' ? 'creator' : 'quest'}
              key="nine"
            >
              {dataMatch.nine}
            </Playes>
          </BoxMatch>
        </CardGame>
        <ToastContainer autoClose={1000} />
      </ContainerGamer>
    </div>
  );
};
