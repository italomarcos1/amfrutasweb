import styled, { keyframes } from 'styled-components';
import { darken } from 'polished';

const rotate = keyframes` /** animação para rotacionar o icon. */
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.li`
  width: ${({ isDesktop }) => (isDesktop ? '370px' : '100%')};
  height: 158px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 6px;
  list-style: none;
`;

export const ItemPicture = styled.img`
  width: ${({ isDesktop }) => (isDesktop ? 70 : 56)}px;
  height: ${({ isDesktop }) => (isDesktop ? 70 : 56)}px;
  border-radius: 4px;
`;

export const Title = styled.h1`
  text-align: left;
  font-weight: normal;
  font-family: 'SFPro';
  font-size: 15px;
  line-height: 22px;
  letter-spacing: 0px;
  color: #393939;
  padding: 0;
  padding-right: 5px;
  text-transform: capitalize;
  height: ${({ isDesktop }) => (isDesktop ? 42 : 45)}px;
  width: ${({ isDesktop }) => (isDesktop ? 245 : 165)}px;
  letter-spacing: 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  background: none;
  text-align: left;
  /* background-color: #00f; */

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  height: 70px;
  justify-content: space-between;
  align-items: flex-start;
  width: 80%;
  /* background-color: #f2f202; */
`;

export const PriceAndAmount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: flex-end;
  width: 75%;

  height: 21px;

  > small {
    text-align: right;
    font-family: 'SFProCustomBold';
    font-size: 14px;
    line-height: 22px;
    letter-spacing: 0px;
    color: #393939;
    align-self: flex-end;

    &.offPrice {
      text-decoration: line-through;
      font-size: 18px;
      color: #f03f39;
    }
  }

  > strong {
    text-align: right;
    font-family: 'SFProCustomBold';
    font-size: 18px;
    line-height: 22px;
    letter-spacing: 0px;
    color: #393939;
    align-self: flex-end;
  }
`;

export const CBackContainer = styled.span`
  padding: 0;
  display: flex;
  color: #e2a63b;
  /* background-color: #63b; */
  height: 21px;
  width: 133px;

  b {
    font-weight: normal;
    font-size: 12px;
    font-family: 'SFProCustom';
  }

  height: 20px;
  align-items: center;
  letter-spacing: 0px;

  /* background-color: #4f4; */

  strong {
    color: #e2a63b;
    font-size: 12px;
    font-family: 'SFProCustomBold';
    margin-right: 3px;
    letter-spacing: 0px;
  }
`;

export const Coins = styled.img`
  width: ${({ isDesktop }) => (isDesktop ? 30.3 : 21.21)}px;
  height: ${({ isDesktop }) => (isDesktop ? 20.5 : 14.35)}px;
  margin-right: ${({ isDesktop }) => (isDesktop ? 6 : 3)}px;
`;

export const Options = styled.div`
  display: flex;
  height: 27px;
  width: ${({ isDesktop }) => (isDesktop ? '358px' : '96%')};
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
`;

export const Button = styled.button.attrs({ type: 'button' })`
  display: flex;
  align-items: center;
  justify-content: ${({ disabled }) => (disabled ? 'center' : 'space-between')};

  text-align: center;
  width: 185px;
  height: 27px;
  padding: 0 7px;
  background-color: ${({ color }) => color};

  border-radius: 4px;

  &:hover {
    background-color: ${({ color }) => darken(0.05, color)};
    transition: all 0.2s;
  }

  small {
    font-family: 'SFPro';
    font-size: 12px;
    margin-top: 0;
    padding: 0;
    border: 0;

    /* line-height: 12px; */
    letter-spacing: 0px;
    color: #fff;
  }

  img {
    width: 17px;
    height: 17px;
    margin-right: 5px;
    margin-left: 0px;
  }

  svg {
    animation: ${rotate} 2s linear infinite;
  }
`;
