import styled from 'styled-components';
import Carousel from 'react-elastic-carousel';

export const SectionTitle = styled.div`
  display: block;
  text-align: left;
  width: ${({ isDesktop }) => (isDesktop ? '821px' : '100%')};
  margin: 35px auto 0;

  strong {
    font-weight: normal;
    font-size: 22px;
    line-height: 29px;
    font-family: 'SFProBold';
    letter-spacing: 0px;
    color: #000;
  }

  small {
    display: block;
    margin-top: 2.5px;
    font-size: 15px;
    line-height: 20px;
    font-family: 'SFPro';
    letter-spacing: 0px;
    color: #8d8d8d;
  }
`;

export const SectionTitleMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${({ isDesktop }) => (isDesktop ? '801px' : '100%')};
  margin: 35px auto 0;
  height: 55px;
`;

export const MenuButtons = styled.div`
  height: 55px;
  width: 99px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${({ isDesktop }) => (isDesktop ? 42 : 29.4)}px;
    height: ${({ isDesktop }) => (isDesktop ? 42 : 29.4)}px;
    border-radius: 50%;
    border: 3px solid #393939;
    background: none;

    & + button {
      margin-left: 10px;
    }
  }
`;

export const Addresses = styled(Carousel)`
  width: ${({ isDesktop }) => (isDesktop ? '801px' : '100%')};
  height: 203px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
  padding: 0;
`;
