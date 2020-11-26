import styled from 'styled-components';

export const Container = styled.ul`
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
