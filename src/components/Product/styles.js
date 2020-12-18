import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ isDesktop }) => (isDesktop ? '176px' : '47.5%')};

  height: ${({ isDesktop }) => (isDesktop ? 376 : 326)}px;

  background-color: #fff;
  border-radius: 6px;
  text-align: left;
  border: 1px solid #f0f0f0;
  transition: all 0.2s;

  &:hover {
    border-color: #0cb68b;
  }

  justify-content: ${({ isDesktop }) =>
    isDesktop ? 'space-between' : 'flex-start'};
  font-family: 'SFProCustom';
  padding: 6px;

  margin-bottom: 28px;
`;

export const Title = styled.div`
  color: #393939;
  font-family: 'SFProCustom';
  font-size: 15px;
  line-height: 22px;
  padding: 0 5px 0 4px;
  padding: ${({ isDesktop }) => (isDesktop ? '0 5px 0 4px' : '0 2.5px 0 2px')};
  height: 64px;

  width: ${({ isDesktop }) => (isDesktop ? '156px' : '95%')};
  letter-spacing: 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  background: none;
  /* background-color: #f0f; */

  margin-top: ${({ isDesktop }) => (isDesktop ? 0 : 5)}px;

  text-align: left;
  text-transform: capitalize;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const FavoriteButton = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 31px;
  margin: 10px 0px 0px 5px;
  background: none;

  img {
    max-width: 31px;
    max-height: 31px;
  }
`;

export const ImageContainer = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  border-radius: 4px;
  background-color: #fff;

  width: ${({ isDesktop }) => (isDesktop ? '164px' : '100%')};
  height: ${({ isDesktop }) => (isDesktop ? '164px' : '100%')};

  img {
    border-radius: 4px;
    width: ${({ isDesktop }) => (isDesktop ? '164px' : '100%')};
  }
`;

export const PriceContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  height: 64px;
  width: 100%;
  padding: 0;
  font-family: 'SFProCustom';
  margin: 10px 0 0;
  letter-spacing: 0px;
  background: none;

  /* background-color: #404; */

  span {
    padding: 0;
    display: flex;
    color: #e2a63b;

    b {
      font-weight: normal;
      font-size: 10px;
      font-family: 'SFProCustom';
    }

    height: 20px;
    align-items: center;
    letter-spacing: 0px;

    /* background-color: #4f4; */

    strong {
      font-size: 10.5px;
      font-family: 'SFProCustomBold';
      margin-right: 3px;
      letter-spacing: 0px;
    }
  }

  small {
    color: #989898;
    text-align: left;
    font-size: 10px;
    line-height: 15px;
    margin-top: 6px;
    letter-spacing: 0px;
    font-family: 'SFProCustom';

    /* background-color: #404; */

    p {
      margin-left: 5px;
      display: inline;
      text-decoration: line-through;
      letter-spacing: 0px;
    }
  }

  > strong {
    color: #393939;
    text-align: left;
    font-size: 20px;
    line-height: 20px;
    font-family: 'SFProCustomBold';
  }
`;

export const Coins = styled.img`
  width: ${({ isDesktop }) => (isDesktop ? 30.3 : 21.21)}px;
  height: ${({ isDesktop }) => (isDesktop ? 20.5 : 14.35)}px;
  margin-right: ${({ isDesktop }) => (isDesktop ? 6 : 3)}px;
`;

export const Options = styled.div`
  display: flex;
  height: ${({ isDesktop }) => (isDesktop ? 45 : 35)}px;

  width: 100%;
  /* background-color: #4f4; */
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  user-select: none;
`;

export const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: ${({ isDesktop }) => (isDesktop ? '103px' : '70%')};

  height: ${({ isDesktop }) => (isDesktop ? 45 : 35)}px;

  /* margin-right: 12px; */
`;

export const UpdateAmountButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: ${({ isDesktop }) => (isDesktop ? '30px' : '30%')};
  max-width: ${({ isDesktop }) => (isDesktop ? '30px' : '30%')};
  padding: ${({ isDesktop }) => (isDesktop ? '10px' : '5px')};
  height: ${({ isDesktop }) => (isDesktop ? 45 : 35)}px;

  border-radius: 4px;
  background-color: #f2f2f2;
  transition: all 0.2s;

  &:hover {
    background-color: ${darken(0.08, '#f2f2f2')};
  }
`;

export const Amount = styled.strong`
  display: inline;
  font-size: ${({ isDesktop }) => (isDesktop ? 18 : 16)}px;

  color: #393939;
  /* margin: 0 10px; */
  font-weight: normal;
  font-family: 'SFProCustom';
  width: ${({ isDesktop }) => (isDesktop ? '40px' : '40%')};
  max-width: ${({ isDesktop }) => (isDesktop ? '40px' : '40%')};
  text-align: center;
`;

export const AddToCartButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ isDesktop }) => (isDesktop ? '45px' : '25%')};

  /* width: 45px; */
  height: ${({ isDesktop }) => (isDesktop ? 45 : 35)}px;

  background-color: #4fb78d;
  border-radius: 4px;

  &:hover {
    background-color: ${darken(0.08, '#4fb78d')};
  }
`;
