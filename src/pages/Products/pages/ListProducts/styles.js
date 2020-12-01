import styled, { keyframes } from 'styled-components';

export const Container = styled.ul`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 995px;
  height: ${({ pageHeight }) => pageHeight}px;
  margin-top: 18px;
`;

export const NullProduct = styled.div`
  opacity: 0;
  width: 176px;
  height: 376px;
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
  width: 840px;
  height: 454px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: 27px;
  text-align: center;

  strong {
    display: inline-block;
    font-family: 'SFPro';
    font-weight: normal;
    font-size: 24px;
    line-height: 36px;
    letter-spacing: 0px;
    color: #666;
    margin-top: 27px;
  }

  svg {
    animation: ${rotate} 2s linear infinite;
  }
`;
