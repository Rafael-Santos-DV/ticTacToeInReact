import React from 'react';
import { BoxUserComponent, Img } from './style';

type TypeBoxUser = {
  player?: number;
  src?: string;
  name?: string;
  match?: 'X' | 'O';
  className?: string;
};

export const BoxUser: React.FC<TypeBoxUser> = ({
  player,
  src,
  name,
  match,
  className,
}) => (
  <BoxUserComponent className={className}>
    <span>Player: {player}</span>
    <div>
      {src?.trim() ? <Img src={src} alt={name} /> : <div className="nulo" />}
      <strong className={`${player === 1 ? 'creator' : 'quest'}`}>
        {name || 'Nenhum jogador'}
      </strong>
      <span className="match">{match}</span>
    </div>
  </BoxUserComponent>
);
