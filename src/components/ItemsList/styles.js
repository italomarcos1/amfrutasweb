import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 30px;
  padding: 0;
  height: 708px;
  width: ${({ isDesktop }) => (isDesktop ? '840px' : '100%')};
  overflow-y: ${({ length, breakpoint }) =>
    length > breakpoint ? 'scroll' : 'hidden'};
  /* background-color: #f90; */
`;

export const List = styled.ul`
  display: flex;
  align-items: flex-start;
  flex-direction: ${({ isDesktop }) => (isDesktop ? 'row' : 'column')};
  justify-content: space-between;
  flex-wrap: wrap;

  /* overflow-y: scroll; */
`;
