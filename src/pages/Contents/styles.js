import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ececec;
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

export const Section = styled.ul`
  width: 1240px;
  height: 1056px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  border-radius: 4px;
  margin: 51px auto 0;
`;

export const BlogPost = styled(Link)`
  display: flex;
  opacity: ${({ isNull }) => (isNull ? 0 : 1)};
  flex-direction: column;
  width: 270px;
  height: 332px;
  background: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  align-items: center;
  justify-content: flex-start;

  img {
    width: 270px;
    height: 159px;
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
`;
