import styled, { keyframes } from 'styled-components';
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
    background-position: cover;
    width: 293px;
    height: 172.5px;
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
`;

export const FooterPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 28px auto 0;
  width: 1240px;
  height: 48px;
  background: #fff;
  border-radius: 4px;
`;

const rotate = keyframes` /** animação para rotacionar o icon. */
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const LoadingContainer = styled.div`
  width: 1240px;
  height: 454px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  margin-top: 27px;

  strong {
    display: inline-block;
    font-family: 'SFPro';
    font-weight: normal;
    font-size: 24px;
    line-height: 36px;
    letter-spacing: 0px;
    color: #666;
    margin-top: 27px;
  }

  svg {
    animation: ${rotate} 2s linear infinite;
  }
`;
