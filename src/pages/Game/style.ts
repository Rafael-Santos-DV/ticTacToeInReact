import styled, { css } from 'styled-components';
import Colors from '../../style/colors';

export const ContainerGamer = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  row-gap: 20px;
`;

export const ContainerScore = styled.header`
  display: flex;
  background-color: ${Colors.white};
  padding: 10px;
  border-radius: 20px;
  justify-content: space-evenly;
  margin-top: 25px;
  /* column-gap: 20px; */
`;

export const Score = styled.div`
  display: flex;
  flex-direction: column;
  /* row-gap: 10px; */
  align-content: flex-start;
  align-items: center;

  div {
    display: flex;
    column-gap: 50px;
    padding: 10px;
    justify-content: space-between;

    span {
      color: ${Colors.backgroundMaster};
      font-weight: bold;
      font-size: 17px;
    }

    span.wins {
      color: ${Colors.green};
      font-size: 18px;
      font-weight: bold;
    }
  }

  strong {
    font-size: 35px;
    text-transform: uppercase;
    color: ${Colors.backgroundMaster};
    padding-bottom: 20px;
    text-shadow: 0px 0px 2px ${Colors.backgroundMaster};
    letter-spacing: 2px;
  }
`;

export const ContainerClicks = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 34px;

  button.down-room {
    background-color: #ff0000;
    padding: 5px 0;
  }

  button.copy {
    background-color: ${Colors.white};
    color: #000;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 5px 0;
    gap: 10px;

    div {
      display: flex;
      align-items: center;
      span {
        font-size: 10px;
        padding-left: 5px;
      }
    }
  }

  button.game-again {
    background-color: ${Colors.green};
    padding: 5px 0;
  }
`;

type TypeCardStatus = {
  status: 'loss' | 'win' | 'draw' | 'normal';
};

export const CardGame = styled.div<TypeCardStatus>`
  display: flex;
  flex-direction: column;
  width: 399px;
  margin: 0 auto;
  position: relative;

  ${(props) =>
    (props.status === 'win' ||
      props.status === 'draw' ||
      props.status === 'loss') &&
    css`
      & .filter-active {
        filter: contrast(0.1);
      }

      & .card-status {
        color: #42f563;
      }
    `}

  ${(props) =>
    props.status === 'draw' &&
    css`
      & .filter-active {
        filter: contrast(0.1);
      }

      & .card-status {
        color: #5cd8fa;
      }
    `}

  ${(props) =>
    props.status === 'loss' &&
    css`
      & .filter-active {
        filter: contrast(0.1);
      }

      & .card-status {
        color: #fa2a05;
      }
    `}
`;

export const ContainerFrameGreen = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;
export const ContainerFrameWhite = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: space-evenly;
`;

export const ImgFrame = styled.img``;

export const BoxMatch = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: space-between;
  align-items: center;
  position: absolute;
  height: 100%;
  width: 100%;
  column-gap: 25px;
`;

export const Playes = styled.button<{ user: 'creator' | 'quest' }>`
  color: ${(props) => (props.user === 'creator' ? Colors.green : '#ff0000')};
  font-size: 30px;
  cursor: pointer;
  padding: 20px 0;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: transparent;
  border: none;
`;

export const ContainerAwait = styled.div`
  margin: 0 auto;
  padding: 0 20px;
`;

type FrameLine = {
  position:
    | 'h-top'
    | 'h-center'
    | 'h-bottom'
    | 'v-left'
    | 'v-center'
    | 'v-right'
    | 'd-7and3'
    | 'd-1and9'
    | 'empate';
};

export const BoxFrameLine = styled.div<FrameLine>`
  position: absolute;
  height: 100%;
  width: 100%;

  img.frame-vertical {
    display: none;
  }

  ${(props) =>
    props.position === 'h-center' &&
    css`
      display: grid;
      justify-content: center;
      align-items: center;
    `}

  ${(props) =>
    props.position === 'h-top' &&
    css`
      display: grid;
      grid-template-rows: repeat(3, 1fr);
      justify-content: space-around;
      align-items: center;
    `}

    ${(props) =>
    props.position === 'h-bottom' &&
    css`
      display: grid;
      justify-content: space-around;

      align-items: center;
      row-gap: 10px;

      &::before {
        content: '';
      }
      &::after {
        content: '';
      }

      > img {
        order: 3;
      }
    `}

    ${(props) =>
    props.position === 'd-1and9' &&
    css`
      display: block;

      img {
        transform: rotate(40deg) translate(94px, 120px);
      }
    `}


    ${(props) =>
    props.position === 'd-7and3' &&
    css`
      display: block;

      img {
        transform: rotate(142deg) translate(94px, -120px);
      }
    `}

    ${(props) =>
    props.position === 'v-center' &&
    css`
      display: flex;

      > img.frame-line {
        display: none;
      }

      > img.frame-vertical {
        display: block;
        width: 100%;
      }
    `}

    ${(props) =>
    props.position === 'v-left' &&
    css`
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      justify-content: space-between;
      align-items: center;
      border: 1px solid red;

      &::before {
        content: 'a';
        order: 3;
      }
      &::after {
        content: 'a';
        order: 2;
      }

      > img.frame-line {
        display: none;
      }

      > img.frame-vertical {
        width: 10px;
        display: inline-block;
        margin: 0 auto;
        order: 1;
        transform: translate(-10px, -24px);
      }
    `}

    ${(props) =>
    props.position === 'v-right' &&
    css`
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      justify-content: space-between;
      align-items: center;
      border: 1px solid red;

      &::before {
        content: 'a';
        order: 1;
      }
      &::after {
        content: 'a';
        order: 2;
      }

      > img.frame-line {
        display: none;
      }

      > img.frame-vertical {
        width: 10px;
        display: inline-block;
        margin: 0 auto;
        order: 3;
        transform: translate(10px, -24px);
      }
    `}
    ${(props) =>
    props.position === 'empate' &&
    css`
      display: none;
    `}


  img {
    width: 100%;
  }
`;

export const CardStatus = styled.div<TypeCardStatus>`
  position: absolute;

  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  z-index: 99;
  background: transparent;
  animation: animate-show 200ms linear;
  color: ${(props) => props.status === 'draw' && '#5cd8fa'};
  color: ${(props) => props.status === 'loss' && '#fa2a05'};
  color: ${(props) => props.status === 'win' && '#42f563'};

  @keyframes animate-show {
    0% {
      transform: translate(-30px, -50px);
    }
    100% {
      transform: translate(0px, 0px);
    }
  }
`;
