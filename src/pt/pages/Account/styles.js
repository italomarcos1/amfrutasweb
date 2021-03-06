import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 100%;
  padding: ${({ isDesktop }) => (isDesktop ? '27px 30px 0' : '20px')};
  overflow-x: hidden;
  overflow-y: hidden;
  margin-top: 0px;
`;

export const Content = styled.div`
  width: ${({ isDesktop }) => (isDesktop ? '1095px' : '100%')};
  display: flex;
  flex-direction: ${({ isDesktop }) => (isDesktop ? 'row' : 'column')};
  align-items: ${({ isDesktop }) => (isDesktop ? 'flex-start' : 'center')};
  justify-content: space-between;
  margin: 0 auto;
`;

export const DeliveryAndCardsContainer = styled.div`
  height: 229px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Menu = styled.div`
  width: 252px;
  height: 451px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-right: ${({ isDesktop }) => (isDesktop ? 32 : 0)}px;
  /* background-color: #ff4242; */

  strong {
    font-weight: normal;
    text-align: left;
    font-family: 'SFPro';
    font-size: 20px;
    line-height: 26px;
    letter-spacing: 0px;
    color: #424242;

    b {
      font-family: 'SFProBold';
    }
  }

  div {
    display: flex;
    flex-direction: column;
    height: 264px;
    width: 252px;
  }
`;

export const Option = styled.button.attrs({
  type: 'button',
})`
  display: flex;
  width: 252px;

  height: 44px;
  align-items: center;
  padding-left: 23px;

  background: none;

  position: relative;

  &::after {
    content: '';
    display: inline-block;
    display: ${({ active }) => (active ? 'inline-block' : 'none')};
    position: absolute;
    border: 12px solid black;
    border-color: transparent white transparent transparent;
    top: 11px;
    left: 225px;
  }
  &::before {
    content: '';
    display: inline-block;
    display: ${({ active }) => (active ? 'inline-block' : 'none')};
    position: absolute;
    border: 11px solid white;
    border-color: transparent #aaa transparent transparent;
    top: 12px;
    left: 225px;
  }

  img {
    width: 19px;
    height: 19px;
    margin-right: 14px;
  }

  strong {
    font-weight: normal;
    text-align: left;
    font-family: ${({ active }) => (active ? 'SFProBold' : 'SFPro')};
    font-size: 14px;
    line-height: 19px;
    letter-spacing: 0px;
    color: #424242;
  }

  border-bottom: 0.1px solid #ccc;
  border-right: 1.5px solid #ccc;
  border-left: 5px solid #0cb68b;
  border-left-style: ${({ active }) => (active ? 'solid' : 'none')};
`;

export const Title = styled.h1`
  font-family: 'SFPro';
  font-size: 25px;
  line-height: 33px;
  letter-spacing: 0px;
  color: #000;
  font-weight: normal;
`;

export const SectionTitle = styled.div`
  display: block;
  text-align: left;
  width: 1240px;
  margin: 0 auto;
`;
