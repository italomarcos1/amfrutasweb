import styled from 'styled-components';

export const ProductsContainer = styled.ul`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  width: ${({ isDesktop }) => (isDesktop ? '995px' : '100%')};
  height: ${({ pageHeight }) => pageHeight}px;
  margin-top: 18px;
`;

export const NullProduct = styled.div`
  opacity: 0;
  width: ${({ isDesktop }) => (isDesktop ? 176 : 116.55)}px;
  height: ${({ isDesktop }) => (isDesktop ? 376 : 326)}px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ isDesktop }) => (isDesktop ? '995px' : '100%')};
  align-items: center;
  justify-content: flex-start;
  margin: 0 auto;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ececec;
  width: 100%;
  padding: 17px 30px 87px;
`;
