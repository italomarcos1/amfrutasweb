import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ececec;
  width: 100%;
  padding: 21px 30px 30px;
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;

  width: 1240px;
  margin-top: 18px;
  border-radius: 4px;

  margin: 0 auto;

  padding-bottom: 50px;
`;

export const Content = styled.div`
  display: flex;
  width: 1046px;
  padding: 20px;
  background-color: #fff;

  > img {
    border-radius: 6px;
    max-width: 1005px;
    background-size: cover;
    /* max-height: 408px; */
    /* background-color: #f00; */
  }

  flex-direction: column;
`;

export const ProductsList = styled.ul`
  width: 176px;
  height: 1543px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const TitleContainer = styled.div`
  display: flex;
  height: 84px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-top: 17px;
`;

export const SearchBar = styled.div`
  width: 1240px;
  height: 48px;
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 10px;
  margin-top: 17px;
`;

export const Title = styled.h1`
  color: #0cb68b;
  font-family: 'SFProBold';
  font-size: 30px;
  line-height: 45px;
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
  width: 100%;
  background-color: #fff;
  color: #666;
  font-size: 16px;
  line-height: 30px;
  font-family: 'SFPro';
  display: flex;
  flex-direction: column;

  border-radius: 4px;
  margin-top: 29px;

  h1,
  h2,
  h3,
  h4,
  h5,
  strong {
    display: block;
    color: #333;
    font-size: 22px;
    font-family: 'SFProBold';
    margin-bottom: 10px;
    margin-top: 20px;
  }

  li {
    margin-bottom: 10px;
  }

  p {
    display: inline-block;
    color: #333;
    margin-top: 10px;
  }

  hr {
    margin-top: 10px;
  }

  img,
  iframe {
    /* min-width: 100%; */
    /* max-width: 1046px; */
    width: 100% !important;
    height: auto !important;
    align-self: center;
    margin: 0 auto;
  }

  a {
    color: #f48312;
  }
`;
