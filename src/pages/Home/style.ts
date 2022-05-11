import styled from 'styled-components';
import Colors from '../../style/colors';

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
    max-width: 480px;
  }
`;

export const BoxLogin = styled.button`
  width: 100%;
  max-width: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
  border: none;
  padding: 5px;
  column-gap: 15px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  transition: filter 200ms ease;

  img {
    width: 32px;
    height: 32px;
  }

  span {
    font-size: 16px;
  }

  &:hover {
    filter: brightness(0.9);
  }
`;

export const CardForm = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  max-width: 250px;
  background-color: ${Colors.white};
  padding: 20px;
  border-radius: 8px;
  row-gap: 10px;
  text-align: center;

  input {
    border-radius: 6px;
    border: 1px solid ${Colors.backgroundMaster};
    padding: 4px;
  }
`;

type buttonFormType = {
  active?: boolean;
};

export const ButtonForm = styled.button<buttonFormType>`
  border-radius: 6px;
  border: none;
  background-color: ${(props) =>
    props.active ? Colors.green : Colors.backgroundMaster};
  color: ${Colors.white};
  cursor: pointer;
  padding: 4px;
  margin-top: 3px;
  transition: filter 200ms ease;

  &:hover {
    filter: brightness(0.9);
  }
`;
