import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 30px;
  padding: 0;
  width: 840px;
`;

export const List = styled.ul`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 840px;
  height: ${({ containerHeight }) => containerHeight};
`;
