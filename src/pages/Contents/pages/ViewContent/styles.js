import styled from 'styled-components';

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
  align-items: center;
  justify-content: flex-start;
  background-color: #ececec;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ececec;
  width: 100%;

  padding: ${({ isDesktop }) => (isDesktop ? '21px 30px 30px' : '10px')};
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;

  width: ${({ isDesktop }) => (isDesktop ? '1240px' : '100%')};

  margin-top: 18px;
  border-radius: 4px;

  margin: 0 auto;

  padding-bottom: 50px;
`;

export const Content = styled.div`
  display: flex;
  width: ${({ isDesktop }) => (isDesktop ? '1046px' : '100%')};
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
  height: ${({ isDesktop }) => (isDesktop ? 124 : 185)}px;
  width: 100%;
  flex-direction: ${({ isDesktop }) => (isDesktop ? 'row' : 'column')};
  align-items: center;
  justify-content: space-between;
  margin-top: 17px;
  /* background-color: #0ff; */
`;

export const Title = styled.h1`
  color: #0cb68b;
  font-family: 'SFProBold';
  font-size: ${({ isDesktop }) => (isDesktop ? 30 : 24)}px;
  line-height: ${({ isDesktop }) => (isDesktop ? 45 : 36)}px;
  padding: 0;
  padding-right: 2.5px;
  height: ${({ isDesktop }) => (isDesktop ? 94 : 134)}px;
  width: ${({ isDesktop }) => (isDesktop ? '70%' : '100%')};
  max-width: ${({ isDesktop }) => (isDesktop ? 'none' : '300px')};
  letter-spacing: 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  background: none;
  text-align: left;
  /* background-color: #00f; */

  display: -webkit-box;
  -webkit-line-clamp: ${({ isDesktop }) => (isDesktop ? 2 : 3)};
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

  img {
    /* min-width: 100%; */
    /* max-width: 1046px; */
    width: 100% !important;
    height: auto !important;
    align-self: center;
    margin: 0 auto;
  }

  iframe {
    /* min-width: 100%; */
    /* max-width: 1046px; */
    width: 100% !important;
    height: 540px;
    align-self: center;
    margin: 0 auto;
  }

  a {
    color: #f48312;
  }
`;
