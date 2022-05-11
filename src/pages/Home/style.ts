import styled from 'styled-components';

export const ContainerHome = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: space-between;
  row-gap: 20px;
  height: 100vh;
  padding: 20px;

  > img {
    width: 100%;
    max-width: 520px;
  }
`;

export const BoxLogin = styled.button`
  width: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  cursor: pointer;
  border: none;
  padding: 5px;
  column-gap: 15px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  transition: filter 200ms ease;

  img {
    width: 36px;
    height: 36px;
  }

  span {
    font-size: 16px;
  }

  &:hover {
    filter: brightness(0.9);
  }
`;
