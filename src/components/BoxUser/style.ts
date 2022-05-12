import styled from 'styled-components';
import Colors from '../../style/colors';

export const BoxUserComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 10px;

  span {
    font-size: 16px;
  }

  div {
    display: flex;
    column-gap: 15px;
    align-items: center;

    strong.creator {
      color: ${Colors.green};
    }

    strong.quest {
      color: #ff0000;
    }

    span.match {
      color: ${Colors.backgroundMaster};
      text-transform: uppercase;
      font-weight: bold;
      text-shadow: 0px 0px 10px ${Colors.backgroundMaster};
      font-size: 20px;
    }
  }
`;

export const Img = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
`;
