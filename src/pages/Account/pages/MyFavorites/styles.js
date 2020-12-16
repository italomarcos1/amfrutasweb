import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ isDesktop }) => (isDesktop ? '821px' : '100%')};
  overflow-x: hidden;
  padding-bottom: 81px;
`;
