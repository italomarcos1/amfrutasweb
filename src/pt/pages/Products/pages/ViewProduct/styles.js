import styled from 'styled-components';
import { darken } from 'polished';

export const buttonStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  width: 110,
  height: 28,
  backgroundColor: '#4f98c6',
  borderRadius: 4,
};

export const buttonTitleStyle = {
  fontFamily: 'SFPro',
  fontSize: 12,
  marginTop: 0,
  padding: 0,
  border: 0,
  letterSpacing: 0,
  color: '#fff',
};

export const imgButtonStyle = {
  width: 17,
  height: 17,
  marginRight: 5,
  marginLeft: 0,
};

export const FullContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 0;
`;

export const Container = styled.div`
  display: flex;
  align-items: flex-start;

  flex-wrap: wrap;
  width: 995px;
  height: 542px;
  height: ${({ pageHeight }) => pageHeight}px;
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
  flex-direction: row;

  width: 100%;
  /* background-color: #ff0; */
  height: 400px;

  > img {
    border-radius: 6px;
    width: 400px;
    /* background-color: #f00; */

    /* height: 400px; */
    object-fit: cover;
    background-color: #333;
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
  height: 339px;
  display: flex;
  align-items: flex-start;
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
  margin-top: 17px;

  strong {
    letter-spacing: 0px;
    color: #141319;
    font-family: 'SFProBold';
    font-size: 12px;
    line-height: 20px;
  }
`;

export const Description = styled.div`
  width: ${({ isDesktop }) => (isDesktop ? '995px' : '100%')};
  background-color: #fff;
  border-radius: 4px;
  margin-top: 20px;
  padding: 35px 28px 50px 24px;
`;

export const AmountAndPriceContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;
  width: 165px;
  height: 76px;
  margin-top: 34px;
  padding: 0;

  small {
    letter-spacing: 0px;
    color: #9e9e9e;
    font-family: 'SFPro';
    font-size: 14px;
    line-height: 14px;
    height: 14px;
    text-align: left;
  }

  strong {
    letter-spacing: 0px;
    color: #3ab879;
    font-family: 'SFProBold';
    font-size: 36px;
    line-height: 36px;
    text-align: left;
    height: 36px;

    b {
      font-size: 22px;
      font-family: 'SFProBold';
    }
  }
`;

export const AmountAndTotalContainer = styled.div`
  display: flex;
  width: 165px;
  justify-content: space-between;
  align-items: center;
  padding: 0;
`;

export const TotalContainer = styled.div`
  display: flex;
  height: 45px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 21px;
`;

export const ShippingContainer = styled.div`
  display: flex;
  height: 34px;
  margin-top: 21px;
  width: 180px;
`;

export const Amount = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 103px;
  height: 45px;
  /* margin-right: 12px; */

  strong {
    display: inline;
    font-size: 18px;
    line-height: 45px;
    /* padding: 10px auto; */
    height: 45px;
    color: #393939;
    /* margin: 0 10px; */
    font-weight: normal;
    font-family: 'SFProCustom';
    width: 35px;
    max-width: 35px;
    text-align: center;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    width: 34px;
    max-width: 34px;
    padding: 10px;
    height: 45px;
    border-radius: 4px;
    background-color: #f2f2f2;
    transition: all 0.2s;

    img {
      width: 13px;
      height: 13px;
    }

    &:hover {
      background-color: ${darken(0.08, '#f2f2f2')};
    }
  }
`;
