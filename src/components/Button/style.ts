import styled, { css } from 'styled-components';
import Colors from '../../style/colors';

type createRoomType = {
  createRoom?: boolean;
};

export const ButtonComponent = styled.button<createRoomType>`
  width: 100%;
  max-width: 220px;
  padding: 11px 0;
  border: none;
  border-radius: 10px;
  background-color: ${(props) =>
    props.createRoom ? Colors.rose : Colors.green};
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  transition: filter 200ms;

  ${(props) =>
    props.disabled
      ? css`
          filter: brightness(0.7);
        `
      : ''}

  &:hover {
    filter: brightness(0.9);
  }
`;
