import styled from 'styled-components';

export const Container = styled.div`
  opacity: 0;
  width: ${({ isDesktop }) => (isDesktop ? '176px' : '47.5%')};
  height: ${({ isDesktop }) => (isDesktop ? '376px' : 'auto')};
  margin-bottom: 28px;
`;
