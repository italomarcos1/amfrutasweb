import styled from 'styled-components';

export const Container = styled.button.attrs({
  type: 'button',
})`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 410px;
  height: 106px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;

  padding: 21px 30px;

  img {
    margin-right: 23px;
  }

  button {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background: none;
    margin-left: 10px;
    width: 9px;
    height: 51px;
  }

  strong {
    font-weight: normal;
    font-size: 22px;
    line-height: 29px;
    font-family: 'SFProLight';
    letter-spacing: 0px;
    color: #424242;
  }

  small {
    display: block;
    font-size: 15px;
    line-height: 20px;
    font-family: 'SFPro';
    letter-spacing: 0px;
    color: #9e9e9e;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: 51px;
  width: 253px;
`;
