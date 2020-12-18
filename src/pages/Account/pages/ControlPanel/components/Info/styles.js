import styled from 'styled-components';

export const Container = styled.button.attrs({
  type: 'button',
})`
  display: flex;
  align-items: ${({ isDesktop }) => (isDesktop ? 'center' : 'flex-start')};

  justify-content: space-between;
  width: ${({ isDesktop }) => (isDesktop ? '410px' : '100%')};
  height: 106px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;

  padding: ${({ isDesktop }) => (isDesktop ? '21px 30px' : '21px 15px')};

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
    font-size: ${({ isDesktop }) => (isDesktop ? 22 : 20)}px;
    line-height: ${({ isDesktop }) => (isDesktop ? 29 : 26)}px;
    font-family: 'SFPro';
    letter-spacing: 0px;
    color: #424242;
  }

  small {
    display: block;
    font-size: ${({ isDesktop }) => (isDesktop ? 15 : 13)}px;
    line-height: ${({ isDesktop }) => (isDesktop ? 20 : 17.3)}px;
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
  width: ${({ isDesktop }) => (isDesktop ? '253px' : '80%')};
`;
