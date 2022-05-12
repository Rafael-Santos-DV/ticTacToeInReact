import styled from 'styled-components';
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

export const CardGame = styled.div``;
