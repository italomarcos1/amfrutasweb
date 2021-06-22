import styled from 'styled-components';

export default styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 28px;
  width: ${({ isDesktop }) => (isDesktop ? '995px' : '100%')};
  height: 48px;
  background: #fff;
  border-radius: 4px;
`;
