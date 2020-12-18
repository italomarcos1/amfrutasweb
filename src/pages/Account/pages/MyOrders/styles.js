import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  /* height: 610px; */
  width: ${({ isDesktop }) => (isDesktop ? '840px' : '100%')};
  display: flex;
  flex-direction: column;
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
  width: ${({ isDesktop }) => (isDesktop ? '840px' : '100%')};
  height: 454px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;

  margin-top: 27px;

  strong {
    display: inline-block;
    font-family: 'SFPro';
    font-weight: normal;
    font-size: ${({ isDesktop }) => (isDesktop ? 24 : 22)}px;
    line-height: 36px;
    letter-spacing: 0px;
    color: #666;
    margin-top: 27px;
  }

  svg {
    animation: ${rotate} 2s linear infinite;
  }
`;
