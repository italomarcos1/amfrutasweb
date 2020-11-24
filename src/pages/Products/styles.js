import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ececec;
  width: 100%;
  padding: 17px 30px 87px;
`;

export const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1240px;
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
  width: 995px;
  align-items: center;
  justify-content: flex-start;
`;

export const ProductsContainer = styled.ul`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 995px;
  height: ${({ pageHeight }) => pageHeight}px;
  margin-top: 18px;
`;

export const NullProduct = styled.div`
  opacity: 0;
  width: 176px;
  height: 376px;
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
