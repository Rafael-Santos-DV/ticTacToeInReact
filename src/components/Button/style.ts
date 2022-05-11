import styled from 'styled-components';
import Colors from '../../style/colors';

export const ButtonComponent = styled.button`
  width: 100%;
  max-width: 220px;
  padding: 11px 0;
  border: none;
  border-radius: 10px;
  background-color: ${Colors.green};
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  transition: filter 200ms;

  &:hover {
    filter: brightness(0.9);
  }
`;
