import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.ul`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 995px;
  height: 542px;
  height: ${({ pageHeight }) => pageHeight}px;
  margin-top: 18px;
  background-color: #fff;
  border-radius: 4px;
  padding: 20px;
  padding-right: 30px;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  /* background-color: #ff0; */
  height: 400px;

  img {
    border-radius: 6px;
    width: 400px;
    height: 400px;
    /* background-color: #f00; */
  }
`;

export const Details = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
  margin-top: 22px;
  justify-content: space-between;
  align-items: flex-end;
`;

export const SearchBar = styled.div`
  width: 995px;
  height: 48px;
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 10px;
`;

export const ProductInfo = styled.div`
  width: 525px;
  height: 400px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  /* background-color: #f0f; */
`;

export const Title = styled.h1`
  color: #141319;
  font-family: 'SFProBold';
  font-size: 20px;
  line-height: 24px;
  padding: 0;
  padding-right: 5px;
  height: 54px;
  width: 525px;
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

export const PriceAndInfoContainer = styled.div`
  width: 525px;
  height: 147px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  /* background-color: #00a0f0; */
`;

export const PriceContainer = styled.div`
  width: 130px;
  height: 92px;
  /* background-color: #f0a0f0; */
  display: flex;
  flex-direction: column;
  text-align: left;

  small {
    letter-spacing: 0px;
    color: #9e9e9e;
    font-family: 'SFPro';
    font-size: 14px;
    line-height: 16px;
    height: 16px;
    text-align: left;
  }

  strong {
    letter-spacing: 0px;
    color: #3ab879;
    font-family: 'SFProBold';
    font-size: 50px;
    line-height: 60px;
    text-align: left;
    height: 60px;

    b {
      font-size: 30px;
      font-family: 'SFProBold';
    }
  }
`;

export const Warning = styled.div`
  width: 130px;
  height: 92px;
  padding: 16px 17px 19px;

  width: 226px;
  height: 147px;
  background-color: #d4eaf5;
  border-radius: 4px;

  letter-spacing: 0px;
  color: #2d6684;
  font-family: 'SFPro';
  font-size: 12px;
  line-height: 14px;
  text-align: left;
`;

export const ShippingButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const FavoritesContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ShippingButton = styled.div`
  display: flex;
  width: 90px;
  height: 34px;
  background-color: #e8e8e8;
  border-radius: 4px;
  padding-left: 18px;
  align-items: center;
  justify-content: flex-start;
  letter-spacing: 0px;
  color: #141319;
  font-family: 'SFPro';
  font-size: 14px;
  line-height: 16px;
`;

export const FreeShipping = styled.div`
  margin-top: 8px;
  letter-spacing: 0px;
  color: #000;
  font-family: 'SFPro';
  font-size: 14px;
  line-height: 16px;

  b {
    font-family: 'SFProBold';
  }
`;

export const FavoriteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 31px;
  background: none;
`;

export const FlexStartContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 25px;

  img {
    width: 25px;
    height: 25px;
  }
`;

export const FlexStartText = styled.small`
  letter-spacing: 0px;
  color: #000;
  font-family: 'SFPro';
  font-size: 14px;
  line-height: 16px;
  margin-left: 7px;
`;

export const ShareThisProduct = styled.div`
  width: 239px;
  height: 51px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  strong {
    letter-spacing: 0px;
    color: #141319;
    font-family: 'SFProBold';
    font-size: 12px;
    line-height: 20px;
  }
`;

export const ShareButton = styled.button.attrs({ type: 'button' })`
  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;
  width: 110px;
  height: 28px;

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
    letter-spacing: 0px;
    color: #fff;
  }

  img {
    width: 17px;
    height: 17px;
    margin-right: 5px;
    margin-left: 0px;
  }
`;

export const Description = styled.div`
  width: 995px;
  background-color: #fff;
  border-radius: 4px;
  margin-top: 20px;
  padding: 35px 28px 50px 24px;
`;
