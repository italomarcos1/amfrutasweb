import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;

  width: 218px;
  height: 30px;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 162px;
    height: 30px;
  }

  > button {
    background: none;
    width: 16px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const PaginationButton = styled.button.attrs({
  type: 'button',
})`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  width: 30px;
  height: 30px;
  background-color: ${({ active }) => (active ? '#3AB879' : '#e7e7e7')};
  border-radius: 15px;

  font-family: 'SFPro';
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0px;
  color: ${({ active }) => (active ? '#fff' : '#000')};
`;
