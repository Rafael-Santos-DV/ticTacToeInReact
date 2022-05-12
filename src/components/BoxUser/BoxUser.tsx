import React from 'react';
import { BoxUserComponent, Img } from './style';

type TypeBoxUser = {
  player?: number;
  src?: string;
  name?: string;
  match?: 'X' | 'O';
};

export const BoxUser: React.FC<TypeBoxUser> = ({
  player,
  src,
  name,
  match,
}) => (
  <BoxUserComponent>
    <span>Player: {player}</span>
    <div>
      <Img src={src} alt={name} />
      <strong className={`${player === 1 ? 'creator' : 'quest'}`}>
        {name}
      </strong>
      <span className="match">{match}</span>
    </div>
  </BoxUserComponent>
);
