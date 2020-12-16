import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ececec;
  width: 100%;
  padding: 17px 30px 43.5px;
`;

export const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  width: ${({ isDesktop }) => (isDesktop ? '1240px' : '100%')};
  margin: 0 auto;
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #fff;
  width: 227px;
  min-height: 855px;
  border-radius: 6px;
`;

export const MenuHeader = styled.div`
  width: 100%;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  height: 67.5px;
  padding: 10px;
  padding-bottom: 13.5px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  border-bottom: 1px solid #ccc;

  strong {
    font-weight: normal;
    font-size: 20px;
    line-height: 24px;
    font-family: 'SFProBold';
    letter-spacing: 0px;
    color: #141319;
  }

  small {
    display: block;
    font-size: 14px;
    line-height: 16px;
    font-family: 'SFPro';
    letter-spacing: 0px;
    color: #3ab879;
    margin-top: 5px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ isDesktop }) => (isDesktop ? '995px' : '100%')};
  align-items: center;
  justify-content: flex-start;
`;

export const SectionTitle = styled.div`
  display: block;
  text-align: left;
  width: 1240px;
  margin: 48px auto 0;

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

export const ProductsContainer = styled.div`
  display: flex;
  width: 1240px;
  justify-content: space-between;
  height: 376px;
  margin: 30px auto 0;
`;

export const PromotionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  background-color: #ececec;
  padding-bottom: 52px;
`;
