import styled, { keyframes } from 'styled-components';
import { Form } from '@unform/web';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ isDesktop }) => (isDesktop ? '821px' : '100%')};
  overflow-x: hidden;
`;

const rotate = keyframes` /** animação para rotacionar o icon. */
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const LoadingContainer = styled.div`
  position: absolute;
  width: ${({ isDesktop }) => (isDesktop ? '683px' : '100%')};
  height: ${({ isDesktop }) => (isDesktop ? 431 : 701)}px;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    z-index: 998;
    animation: ${rotate} 2s linear infinite;
  }
`;

export const Content = styled.div`
  width: ${({ isDesktop }) => (isDesktop ? '821px' : '100%')};
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
`;

export const InfoContainer = styled(Form)`
  width: ${({ isDesktop }) => (isDesktop ? '683px' : '100%')};
  height: ${({ isDesktop }) => (isDesktop ? 431 : 701)}px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;

  opacity: ${({ loading }) => (loading ? 0.4 : 1)};
  padding: ${({ isDesktop }) => (isDesktop ? '21px 29px 36px 27px' : '19px')};
`;

export const SectionTitle = styled.div`
  display: block;
  text-align: left;
  width: ${({ isDesktop }) => (isDesktop ? '1240px' : '100%')};
  margin: 0 auto;

  strong {
    font-weight: normal;
    font-size: 22px;
    line-height: 29px;
    font-family: 'SFProBold';
    letter-spacing: 0px;
    color: #000;
  }

  small {
    display: block;
    margin-top: 2.5px;
    font-size: 15px;
    line-height: 20px;
    font-family: 'SFPro';
    letter-spacing: 0px;
    color: #0cb68b;
  }
`;
