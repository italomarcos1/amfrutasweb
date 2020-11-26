import styled from 'styled-components';

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

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 995px;
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
