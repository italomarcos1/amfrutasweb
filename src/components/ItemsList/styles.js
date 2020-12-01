import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 30px;
  padding: 0;
  /* width: ${({ containerWidth }) => containerWidth}; */
`;

export const List = styled.ul`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  height: ${({ containerHeight }) => containerHeight};
`;
