import styled from 'styled-components';

export const Container = styled.div`
  margin: 10px auto 0;
  width: 1240px;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  /* width: 1240px; */

  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
