import styled from 'styled-components';
import { Form } from '@unform/web';

export const Container = styled(Form)`
  width: ${({ isDesktop }) => (isDesktop ? '569px' : '100%')};
  height: ${({ isDesktop }) => (isDesktop ? '566px' : '100%')};
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
