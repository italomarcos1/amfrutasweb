import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: ${({ isDesktop }) => (isDesktop ? '330px' : '100%')};
  height: 28px;
  background-color: #e7e7e7;
  border-radius: 4px;
  padding-left: 15px;
  padding-right: 9px;

  input {
    font-family: 'SFPro';
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0px;
    color: #141319;
    width: 95%;
    background: none;

    &::placeholder {
      color: #000;
      font-family: 'SFPro';
    }
  }

  img {
    width: 12.8px;
    height: 12.8px;
  }
`;
