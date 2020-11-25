import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ececec;
  width: 100%;
  padding: 21px 30px 87px;
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
  width: 295px;
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

export const FooterPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 28px;
  width: 995px;
  height: 48px;
  background: #fff;
  border-radius: 4px;
`;
