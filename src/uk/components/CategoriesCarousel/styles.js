import styled from 'styled-components';
import Carousel from 'react-elastic-carousel';
import { Link } from 'react-router-dom';

export const SectionTitleMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${({ isDesktop }) => (isDesktop ? '1240px' : '100%')};
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

export const SectionTitle = styled.div`
  display: block;
  text-align: left;
  width: ${({ isDesktop }) => (isDesktop ? '1240px' : '100%')};
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

export const Categories = styled(Carousel)`
  width: ${({ isDesktop }) => (isDesktop ? '1240px' : '100%')};
  height: 168px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px auto 0;
  padding: 0;
`;

export const Category = styled(Link)`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  height: 168px;

  width: ${({ isDesktop }) => (isDesktop ? 114 : 80)}px;

  img {
    width: ${({ isDesktop }) => (isDesktop ? 114 : 80)}px;
    height: ${({ isDesktop }) => (isDesktop ? 114 : 80)}px;

    border-radius: 50%;
  }

  small {
    width: 124px;

    text-align: center;
    font-family: 'SFPro';
    font-size: 15px;
    line-height: 20px;
    letter-spacing: 0px;
    color: #000;
    margin-top: 15px;
    text-transform: capitalize;
  }
`;
