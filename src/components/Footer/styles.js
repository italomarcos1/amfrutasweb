import styled from 'styled-components';

export const TopFooter = styled.div`
  width: 100%;
  height: ${({ isDesktop }) => (isDesktop ? 212 : 414)}px;
  background-color: #f8f9fb;
  padding: 25px 0;
  display: flex;
  flex-direction: column;

  img {
    width: 233px;
    height: 52px;
    margin: 0 auto;
  }
`;

export const ItemsContainer = styled.div`
  display: flex;
  flex-direction: ${({ isDesktop }) => (isDesktop ? 'row' : 'column')};
  width: ${({ isDesktop }) => (isDesktop ? '741px' : '100%')};
  height: ${({ isDesktop }) => (isDesktop ? 81 : 283)}px;
  align-items: flex-start;
  margin: 28px auto 0;
`;

export const Item = styled.div`
  padding-left: 7px;
  height: 81px;

  border-left: 8px solid #0cb68b;

  margin-left: ${({ isDesktop }) => (isDesktop ? 0 : 60)}px;

  & + div {
    margin-left: ${({ isDesktop }) => (isDesktop ? 80 : 60)}px;
    margin-top: ${({ isDesktop }) => (isDesktop ? 0 : 20)}px;
  }

  span {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    height: 72px;
    font-family: 'SFPro';
    font-size: 15px;
    line-height: 26px;
    letter-spacing: 0px;
    color: #000000;
    text-transform: uppercase;

    a {
      color: #000000;
      font-family: 'SFPro';
      transition: all 0.2s;

      &:hover {
        color: #0cb68b;
      }
    }
  }
`;

export const BottomFooter = styled.div`
  width: 100%;
  height: ${({ isDesktop }) => (isDesktop ? 65 : 200)}px;
  background-color: #0cb68b;
  display: flex;
  flex-direction: ${({ isDesktop }) => (isDesktop ? 'row' : 'column')};
  padding: ${({ isDesktop }) => (isDesktop ? '0 212px 0 237px' : '20px 0')};
  text-align: center;
  letter-spacing: 0px;
  color: #fff;

  img {
    width: 32px;
    height: 32px;
  }
`;

export const BottomFooterContent = styled.div`
  width: ${({ isDesktop }) => (isDesktop ? '850px' : '100%')};
  height: ${({ isDesktop }) => (isDesktop ? 65 : 200)}px;
  flex-direction: ${({ isDesktop }) => (isDesktop ? 'row' : 'column')};

  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;

  small {
    font-family: 'SFPro';
    font-size: 15px;
    line-height: 22px;
    letter-spacing: 0px;
  }

  b {
    font-family: 'SFProBold';
  }
`;
