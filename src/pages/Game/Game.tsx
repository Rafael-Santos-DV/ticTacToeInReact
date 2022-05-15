import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { BoxUser } from '../../components/BoxUser/BoxUser';
import { ButtonComponent } from '../../components/Button/style';
import { useAuth } from '../../hooks/useAuth';
import 'react-toastify/dist/ReactToastify.css';

import copy from '../../assets/copy.svg';
import frameGreen from '../../assets/frame-green.svg';
import frameWhite from '../../assets/frame-white.svg';
import awaitImage from '../../assets/await-for-player.svg';
import frameLine from '../../assets/frame-line.svg';
import frameVertical from '../../assets/frame-vertical.svg';

import {
  BoxFrameLine,
  BoxMatch,
  BoxTurn,
  CardGame,
  CardStatus,
  ContainerAwait,
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

type LineWin =
  | 'h-top'
  | 'h-center'
  | 'h-bottom'
  | 'v-left'
  | 'v-center'
  | 'v-right'
  | 'd-7and3'
  | 'd-1and9'
  | 'empate';

type TypeData = {
  author: {
    avatar: string;
    user: string;
    id: string;
  };
  nameRoom: string;
  anotations: {
    restart: boolean;
    winner: string;
    jogadorInit: string;
    line: LineWin | undefined;
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

type TypeCardStatus = 'loss' | 'win' | 'draw' | 'normal';

export const Game: React.FC = () => {
  const { user, handleCacheSingInWithGoogle } = useAuth();
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<TypeData>();
  const [fetchComponent, setComponent] = useState(false);
  const [awaitPlayer, setAwaitPlayer] = useState(true);
  // const [lineWin, setLineWin] = useState<LineWin>('empate');
  const [stopButton, setStopButton] = useState(false);
  const [gameStatus, setGameStatus] = useState<TypeCardStatus>('normal');
  const [turn, setTurn] = useState<{
    player: 'player1' | 'player2';
    nome: string;
  }>();

  const [lineCard, setLineCard] = useState<LineWin>();

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
    toast.loading('Carregando...', { position: 'top-center' });
    const roomRef = database.ref(`gameRooms/${params.id}`);

    roomRef.on('value', async (roomValues) => {
      const exists = await roomRef.get();

      if (!exists.exists()) {
        navigate('/');
        return;
      }

      // esquema de win
      // diagonal: 1 - 5 - 9  ----- 7 - 5 - 3
      // vertical: 1 - 4 - 7 ----- 2 - 5 - 8 ---- 3 - 6 - 9
      // horizontal: 1 - 2 - 3 ----- 4 - 5 - 6 ---- 7 - 8 - 9

      const result: TypeData = await roomValues.val();

      if (result.anotations.restart) {
        setMatch({
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
        setLineCard('empate');
        setGameStatus('normal');
        setStopButton(false);
      }

      const { anotations } = result;
      setTurn(
        anotations.jogadorInit === anotations.creator.id
          ? { nome: anotations.creator.user, player: 'player1' }
          : { nome: anotations.quest.user, player: 'player2' }
      );

      const { creator, quest } = result.anotations;
      const { winner } = result.anotations;

      if (quest.id) {
        setAwaitPlayer(false);
      }

      if (!user) {
        const response = await handleCacheSingInWithGoogle();

        if (response?.id !== creator.id && response?.id !== quest.id) {
          navigate('/');
          return;
        }

        if (winner !== 'none') {
          if (winner === response?.id) {
            setLineCard(result.anotations.line);
            setGameStatus('win');
          } else {
            setLineCard(result.anotations.line);
            setGameStatus('loss');
          }
        }
      }

      if (
        anotations.winner === 'none' &&
        quest.plays.length + creator.plays.length === 9
      ) {
        setGameStatus('draw');
      }

      setComponent(true);
      setData(result);
      setLineCard(result.anotations.line);

      if (winner !== 'none' && user) {
        if (winner === user.id) {
          setLineCard(result.anotations.line);
          setGameStatus('win');
        } else {
          setLineCard(result.anotations.line);
          setGameStatus('loss');
        }
      }

      creator?.plays.forEach((key) => {
        if (key !== 'init') {
          setMatch((value) => ({ ...value, [key]: 'X' }));
        }
      });

      quest?.plays.forEach((key) => {
        if (key !== 'init') {
          setMatch((value) => ({ ...value, [key]: 'O' }));
        }
      });
    });

    return () => {
      roomRef.off('value');
    };
  }, [params.id]);

  function handleVerifyWinner(Plays: Array<string>): {
    status: boolean;
    line: LineWin;
  } {
    const statusAndLine: { status: boolean; line: LineWin } = {
      status: false,
      line: 'empate',
    };

    const horizontalTop =
      Plays.includes('one') && Plays.includes('two') && Plays.includes('three');

    const horizontalCenter =
      Plays.includes('four') && Plays.includes('five') && Plays.includes('six');

    const horizontalBottom =
      Plays.includes('seven') &&
      Plays.includes('eigth') &&
      Plays.includes('nine');

    // diagonal
    const diagonalOneToNine =
      Plays.includes('one') && Plays.includes('five') && Plays.includes('nine');

    const diagonalSevenToThree =
      Plays.includes('seven') &&
      Plays.includes('five') &&
      Plays.includes('three');

    const verticalLeft =
      Plays.includes('one') &&
      Plays.includes('four') &&
      Plays.includes('seven');

    const verticalCenter =
      Plays.includes('two') &&
      Plays.includes('five') &&
      Plays.includes('eigth');

    const verticalRight =
      Plays.includes('three') &&
      Plays.includes('six') &&
      Plays.includes('nine');

    if (horizontalTop) {
      // setLineWin('h-top');
      statusAndLine.line = 'h-top';
      setStopButton(true);
    } else if (horizontalBottom) {
      // setLineWin('h-bottom');
      statusAndLine.line = 'h-bottom';
      setStopButton(true);
    } else if (horizontalCenter) {
      // setLineWin('h-center');
      statusAndLine.line = 'h-center';
      setStopButton(true);
    } else if (verticalLeft) {
      // setLineWin('v-left');
      statusAndLine.line = 'v-left';
      setStopButton(true);
    } else if (verticalCenter) {
      // setLineWin('v-center');
      statusAndLine.line = 'v-center';
      setStopButton(true);
    } else if (verticalRight) {
      // setLineWin('v-right');
      statusAndLine.line = 'v-right';
      setStopButton(true);
    } else if (diagonalOneToNine) {
      // setLineWin('d-1and9');
      statusAndLine.line = 'd-1and9';
      setStopButton(true);
    } else if (diagonalSevenToThree) {
      // setLineWin('d-7and3');add
      statusAndLine.line = 'd-7and3';
      setStopButton(true);
    }

    statusAndLine.status =
      horizontalTop ||
      horizontalCenter ||
      horizontalBottom ||
      diagonalOneToNine ||
      diagonalSevenToThree ||
      verticalLeft ||
      verticalCenter ||
      verticalRight;

    return statusAndLine;
  }

  async function handlePlayesOfUser(match: string, userId?: string) {
    const roomRef = database.ref(`gameRooms/${params.id}`);
    const response = await roomRef.get();
    const values: TypeData = response.val();

    // Creator
    if (data?.author.id === userId) {
      if (stopButton) return;

      let { plays: PlaysCreator } = values.anotations.creator;
      const { plays: PlaysQuest } = values.anotations.quest;
      const { jogadorInit } = values.anotations;
      const { id: QuestId } = values.anotations.quest;

      if (!QuestId) {
        toast.error('Esperando por outro jogador!');
        return;
      }

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
        toast.warn('Já existe!');
        return;
      }

      // win for creator

      PlaysCreator.push(match);

      const resultWinner = handleVerifyWinner(PlaysCreator);
      if (resultWinner.status) {
        values.anotations.winner = user.id;
        values.anotations.line = resultWinner.line;
        values.anotations.creator.wins += 1;
        values.anotations.jogadorInit = values.anotations.creator.id;
      } else {
        values.anotations.jogadorInit = values.anotations.quest.id;
      }

      values.anotations.creator.plays = PlaysCreator;
      await roomRef.update(values);
      setMatch((value) => ({ ...value, [match]: 'X' }));

      //
    } else {
      if (stopButton) return;
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
        toast.warn('Já existe!');
        return;
      }

      PlaysQuest.push(match);
      const resultWinner = handleVerifyWinner(PlaysQuest);

      if (resultWinner.status) {
        values.anotations.winner = user.id;
        values.anotations.line = resultWinner.line;
        values.anotations.quest.wins += 1;
        values.anotations.jogadorInit = values.anotations.quest.id;
      } else {
        values.anotations.jogadorInit = values.anotations.creator.id;
      }

      values.anotations.quest.plays = PlaysQuest;
      await roomRef.update(values);
      setMatch((value) => ({ ...value, [match]: 'O' }));
    }
  }

  async function handleRestartGame(userId?: string) {
    const roomRef = database.ref(`gameRooms/${params.id}`);
    const dataGame: TypeData = await (await roomRef.get()).val();
    const { creator } = dataGame.anotations;

    if (creator.id !== userId) return;

    dataGame.anotations.line = 'empate';
    dataGame.anotations.winner = 'none';
    dataGame.anotations.creator.plays = ['init'];
    dataGame.anotations.quest.plays = ['init'];
    dataGame.anotations.restart = true;

    await roomRef.update(dataGame);
  }

  async function handleEndRoom(userId?: string) {
    const roomRef = database.ref(`gameRooms/${params.id}`);
    const { id } = await (await roomRef.get()).val().author;
    if (userId === id) {
      await roomRef.remove();
      return;
    }
    toast.warn('Você não pode deletar essa sala');
    return;
  }

  return (
    <div className="container-master">
      {!fetchComponent && <ToastContainer autoClose={1000} limit={1} />}
      {fetchComponent && (
        <ContainerGamer>
          <ContainerScore>
            <BoxUser
              src={data?.anotations.creator.avatar}
              name={data?.anotations.creator.user}
              match="X"
              player={1}
              className="player1"
            />

            <Score className="score">
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
              className="player2"
            />
          </ContainerScore>

          <ContainerClicks>
            <ButtonComponent
              className="down-room"
              onClick={() => handleEndRoom(user?.id)}
            >
              Encerrar sala
            </ButtonComponent>
            <ButtonComponent
              className="copy"
              onClick={() =>
                window.navigator.clipboard.writeText(params.id ?? '')
              }
            >
              <img src={copy} alt="copiar" />
              <div>
                SALA # <span>{params.id}</span>
              </div>
            </ButtonComponent>
            <ButtonComponent
              className="game-again"
              onClick={() => handleRestartGame(user?.id)}
            >
              Jogar Novamente
            </ButtonComponent>
          </ContainerClicks>
          <BoxTurn className="vez" turn={turn?.player}>
            Sua vez: <strong>{turn?.nome}</strong>
          </BoxTurn>
          {awaitPlayer ? (
            <ContainerAwait>
              <img src={awaitImage} alt="Esperando por jogador" />
            </ContainerAwait>
          ) : (
            <CardGame status={gameStatus}>
              <ContainerFrameGreen className="filter-active">
                <ImgFrame src={frameGreen} alt="frame green horizontal" />
                <ImgFrame src={frameGreen} alt="frame green horizontal" />
              </ContainerFrameGreen>

              <ContainerFrameWhite className="filter-active">
                <ImgFrame src={frameWhite} alt="frame white vertical" />
                <ImgFrame src={frameWhite} alt="frame white vertical" />
              </ContainerFrameWhite>

              <BoxMatch className="filter-active">
                <Playes
                  aria-label="Jogada do usuário"
                  onClick={() => handlePlayesOfUser('one', user?.id)}
                  key="one"
                  user={dataMatch.one === 'X' ? 'creator' : 'quest'}
                  disabled={stopButton}
                >
                  {dataMatch.one}
                </Playes>
                <Playes
                  aria-label="Jogada do usuário"
                  onClick={() => handlePlayesOfUser('two', user?.id)}
                  key="two"
                  user={dataMatch.two === 'X' ? 'creator' : 'quest'}
                  disabled={stopButton}
                >
                  {dataMatch.two}
                </Playes>
                <Playes
                  aria-label="Jogada do usuário"
                  onClick={() => handlePlayesOfUser('three', user?.id)}
                  key="three"
                  user={dataMatch.three === 'X' ? 'creator' : 'quest'}
                  disabled={stopButton}
                >
                  {dataMatch.three}
                </Playes>
                <Playes
                  aria-label="Jogada do usuário"
                  onClick={() => handlePlayesOfUser('four', user?.id)}
                  key="four"
                  user={dataMatch.four === 'X' ? 'creator' : 'quest'}
                  disabled={stopButton}
                >
                  {dataMatch.four}
                </Playes>
                <Playes
                  aria-label="Jogada do usuário"
                  onClick={() => handlePlayesOfUser('five', user?.id)}
                  key="five"
                  user={dataMatch.five === 'X' ? 'creator' : 'quest'}
                  disabled={stopButton}
                >
                  {dataMatch.five}
                </Playes>
                <Playes
                  aria-label="Jogada do usuário"
                  onClick={() => handlePlayesOfUser('six', user?.id)}
                  key="six"
                  user={dataMatch.six === 'X' ? 'creator' : 'quest'}
                  disabled={stopButton}
                >
                  {dataMatch.six}
                </Playes>
                <Playes
                  aria-label="Jogada do usuário"
                  onClick={() => handlePlayesOfUser('seven', user?.id)}
                  key="seven"
                  user={dataMatch.seven === 'X' ? 'creator' : 'quest'}
                  disabled={stopButton}
                >
                  {dataMatch.seven}
                </Playes>
                <Playes
                  aria-label="Jogada do usuário"
                  onClick={() => handlePlayesOfUser('eigth', user?.id)}
                  key="eigth"
                  user={dataMatch.eigth === 'X' ? 'creator' : 'quest'}
                  disabled={stopButton}
                >
                  {dataMatch.eigth}
                </Playes>
                <Playes
                  aria-label="Jogada do usuário"
                  onClick={() => handlePlayesOfUser('nine', user?.id)}
                  user={dataMatch.nine === 'X' ? 'creator' : 'quest'}
                  key="nine"
                  disabled={stopButton}
                >
                  {dataMatch.nine}
                </Playes>
              </BoxMatch>

              <BoxFrameLine position={lineCard} className="filter-active">
                <img className="frame-line" src={frameLine} alt="Frame win" />
                <img
                  className="frame-vertical"
                  src={frameVertical}
                  alt="Frame vertical"
                />
              </BoxFrameLine>

              {gameStatus !== 'normal' && (
                <CardStatus className="card-status" status={gameStatus}>
                  {gameStatus === 'win' && <span>Você venceu!</span>}
                  {gameStatus === 'loss' && <span>Você perdeu!</span>}
                  {gameStatus === 'draw' && <span>Deu empate!</span>}
                </CardStatus>
              )}
            </CardGame>
          )}

          <ToastContainer autoClose={1000} />
        </ContainerGamer>
      )}
    </div>
  );
};
