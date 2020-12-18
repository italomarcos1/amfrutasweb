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
  width: 100%;
`;

export const Container = styled.div`
  display: flex;
  align-items: flex-start;

  flex-wrap: wrap;
  width: 100%;
  background-color: #fff;
  border-radius: 4px;
  padding: 10px;
  padding-right: 15px;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  /* background-color: #ff0; */
  height: 557px;
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
  width: 100%;
  height: 235px;
  margin-top: 20px;
  display: flex;
  /* background-color: #f0f; */

  > img {
    border-radius: 6px;
    width: 55%;
    /* background-color: #f00; */

    /* height: 400px; */
    object-fit: cover;
    background-color: #333;
  }

  small {
    letter-spacing: 0px;
    color: #9e9e9e;
    font-family: 'SFPro';
    font-size: 14px;
    line-height: 16px;
    height: 16px;
    text-align: left;
  }
`;

export const Title = styled.h1`
  color: #141319;
  font-family: 'SFProBold';
  font-size: 20px;
  line-height: 24px;
  padding: 0;
  padding-right: 5px;
  height: 54px;
  width: 280px;
  letter-spacing: 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  background-color: none;
  white-space: wrap;

  display: inline-block;
  line-clamp: 2;
  box-orient: vertical;
`;

export const PriceAndInfoContainer = styled.div`
  width: 40%;
  display: flex;
  height: 235px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  /* background-color: #00a0f0; */
  margin-left: 10px;
`;

export const PriceContainer = styled.div`
  width: 100%;
  height: 72px;

  /* background-color: #f0a0f0; */
  display: flex;
  flex-direction: column;
  text-align: left;

  strong {
    letter-spacing: 0px;
    color: #3ab879;
    font-family: 'SFProBold';
    font-size: 36px;
    line-height: 43px;
    text-align: left;
    height: 43px;

    b {
      font-size: 22px;
      font-family: 'SFProBold';
    }
  }
`;

export const Amount = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 103px;
  height: 45px;
  margin-top: 24px;

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

export const TotalContainer = styled.div`
  display: flex;
  height: 45px;
  width: 100%;
  background-color: #0f0;
  margin-top: 24px;

  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

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

  /* background-color: #39f; */

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
  height: 60px;
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

export const ShippingContainer = styled.div`
  display: flex;
  height: 34px;
  margin-top: 21px;
  width: 180px;

  background-color: #390;
`;

export const SectionTitle = styled.div`
  display: block;
  text-align: left;
  width: 100%;

  margin: 20px auto 0;
  padding-left: 25px;

  strong {
    font-weight: normal;
    font-size: 20px;
    line-height: 22px;
    font-family: 'SFProBold';
    letter-spacing: 0px;
    color: #000;
  }

  small {
    display: block;
    margin-top: 7.5px;

    font-size: 15px;
    line-height: 20px;
    font-family: 'SFPro';
    letter-spacing: 0px;
    color: #8d8d8d;
  }
`;

export const ProductsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  height: 680px;
  flex-wrap: wrap;
  margin: 30px auto 0;
  padding: 0 20px;

  /* flex-wrap: wrap; */
`;
