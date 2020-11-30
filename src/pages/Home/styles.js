import styled from 'styled-components';
import { Form } from '@unform/web';
import { darken } from 'polished';
import { Link } from 'react-router-dom';

export const Container = styled(Form)`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 100%;
  padding: 21px 30px 87px;
`;

export const OptionsContainer = styled.div`
  display: flex;
  width: 1240px;
  justify-content: space-between;
  height: 106px;
  margin: 21px auto 0;
`;

export const ProductsContainer = styled.div`
  display: flex;
  width: 1240px;
  justify-content: space-between;
  height: 376px;
  margin: 30px auto 0;
`;

export const SecurityContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 1240px;
  height: 89px;
  background-color: #f2f2f2;
  margin: 30px auto 0;

  text-align: center;
  letter-spacing: 0px;
  color: #2b2b2b;
  opacity: 1;

  font-size: 30px;
  line-height: 39px;
  font-family: 'SFPro';
`;

export const StoreButtonContainer = styled.div`
  display: flex;
  width: 343px;
  height: 50px;
  justify-content: space-between;
  margin-top: 19px;
`;

export const StoreButton = styled.a`
  width: 164px;
  height: 50px;
  border-radius: 5px;
`;

export const Option = styled.div`
  width: 380px;
  height: 106px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 24px 36px;
  align-items: center;

  img {
    width: 44px;
    height: 44px;
  }

  div {
    display: block;
    text-align: left;
    margin-left: 20px;

    strong {
      font-weight: normal;
      font-size: 22px;
      line-height: 29px;
      font-family: 'SFPro';
      letter-spacing: 0px;
      color: #0cb68b;
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
  }
`;

export const SectionTitle = styled.div`
  display: block;
  text-align: left;
  width: 1240px;
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

export const Section = styled.div`
  width: 1240px;
  height: 398px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  margin: 30px auto 0;
`;

export const Location = styled.div`
  width: 400px;
  height: 398px;
  background-color: #20b78c;
  border-radius: 4px;
  padding: 25.5px 62px 25.5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  small {
    color: #ebff29;

    font-family: 'SFPro';
    font-size: 15px;
    line-height: 22px;
  }

  h1 {
    text-align: center;
    letter-spacing: 0px;
    color: #fff;
    opacity: 1;

    font-size: 30px;
    line-height: 39px;
    font-family: 'SFPro';
  }

  p {
    color: #fff;
    font-family: 'SFPro';
    font-size: 15px;
    line-height: 22px;
    height: 39px;

    margin-top: 20px;
  }

  a {
    width: 241.24px;
    height: 38px;
    margin-top: 20px;

    background: none;
    border: 1px solid #eee;
    text-align: center;
    color: #fff;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      color: #20b78c;
      background-color: #fff;
    }

    strong {
      font-family: 'SFPro';
      font-size: 15px;
      line-height: 22px;
      text-transform: uppercase;
    }
  }
`;

export const NullLocation = styled.div`
  width: 400px;
  height: 398px;
  background-color: #20b78c;
  border-radius: 4px;
`;

export const BlogPost = styled(Link)`
  display: flex;
  flex-direction: column;
  width: 270px;
  height: 350px;
  background: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  align-items: center;
  justify-content: flex-start;
  object-fit: cover;
  transition: all 0.2s;

  img {
    width: 268px;
    height: 176px;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;

    object-fit: cover;
  }

  strong {
    text-align: center;
    font-family: 'SFProBold';
    font-size: 15px;
    line-height: 20px;
    letter-spacing: 0px;
    color: #000;
    text-transform: uppercase;
    margin-top: 10px;
    width: 229px;
    height: 42px;
  }

  small {
    text-align: center;
    font-family: 'SFPro';
    font-size: 15px;
    line-height: 20px;
    letter-spacing: 0px;
    color: #8d8d8d;
    margin-top: 10px;
    width: 229px;
  }

  &:hover {
    border-color: #0cb68b;
  }
`;

export const Promotions = styled.strong`
  text-align: center;
  font-family: 'SFProBold';
  font-size: 40px;
  line-height: 48px;
  letter-spacing: 0px;
  color: #585b60;
  margin-top: 65px;
`;

export const PromotionsSubTitle = styled.small`
  text-align: center;
  font-family: 'SFPro';
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0px;
  color: #abacae;
  margin-top: 12px;
`;

export const SendButton = styled.button`
  width: 140px;
  height: 50px;
  background: #0cb68b;
  border-radius: 2px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  font-family: 'SFPro';
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${darken('0.15', '#0cb68b')};
  }
`;
