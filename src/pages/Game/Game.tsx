import React from 'react';
import { BoxUser } from '../../components/BoxUser/BoxUser';
import { ButtonComponent } from '../../components/Button/style';
import { useAuth } from '../../hooks/useAuth';

import copy from '../../assets/copy.svg';

import {
  CardGame,
  ContainerClicks,
  ContainerGamer,
  ContainerScore,
  Score,
} from './style';

export const Game: React.FC = () => {
  const { user } = useAuth();
  return (
    <div className="container-master">
      <ContainerGamer>
        <ContainerScore>
          <BoxUser src={user?.avatar} name={user?.user} match="X" player={1} />

          <Score>
            <div>
              <span>1</span>
              <span className="wins">Vitórias</span>
              <span>1</span>
            </div>
            <strong>vs</strong>
          </Score>

          <BoxUser src={user?.avatar} name={user?.user} match="O" player={2} />
        </ContainerScore>

        <ContainerClicks>
          <ButtonComponent className="down-room">Encerrar sala</ButtonComponent>
          <ButtonComponent className="copy">
            <img src={copy} alt="copiar" />
            <div>
              SALA # <span>codigo</span>
            </div>
          </ButtonComponent>
          <ButtonComponent className="game-again">
            Jogar Novamente
          </ButtonComponent>
        </ContainerClicks>

        <CardGame />
      </ContainerGamer>
    </div>
  );
};
