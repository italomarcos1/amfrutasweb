import styled from 'styled-components';

export const Container = styled.button.attrs({
  type: 'button',
})`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
  width: ${({ isDesktop }) => (isDesktop ? '410px' : '100%')};
  height: 229px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;

  padding: ${({ isDesktop }) => (isDesktop ? '21px 30px' : '10.5px 15px')};

  img {
    margin-right: 28px;
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
    font-size: ${({ isDesktop }) => (isDesktop ? 22 : 18)}px;
    line-height: ${({ isDesktop }) => (isDesktop ? 29 : 23.7)}px;
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

export const InfoContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: 51px;
  width: ${({ isDesktop }) => (isDesktop ? '253px' : '60%')};
`;

export const AddressInfo = styled.div`
  width: ${({ isDesktop }) => (isDesktop ? '267px' : '65%')};
  height: 91px;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 69px;

  strong {
    font-size: 12px;
    line-height: 19px;
    font-family: 'SFPro';
    letter-spacing: 0px;
    color: #424242;
    margin: 0;
  }

  small {
    margin: 0;

    font-size: 11px;
    line-height: 19px;
    font-family: 'SFPro';
    letter-spacing: 0px;
    color: #9e9e9e;
    text-align: left;
  }

  b {
    font-family: 'SFProBold';
  }

  h3 {
    font-size: 14px;
    line-height: 19px;
    font-family: 'SFPro';
    letter-spacing: 0px;
    color: #9e9e9e;
    text-align: left;
  }
`;
