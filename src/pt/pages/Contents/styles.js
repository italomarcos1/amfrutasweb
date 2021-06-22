import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ececec;
  width: 100%;
  padding: ${({ isDesktop }) =>
    isDesktop ? '21px 30px 87px' : '0 20px 43.5px'};
  margin-top: ${({ isDesktop }) => (isDesktop ? 0 : 20)}px;
`;

export const Section = styled.ul`
  width: ${({ isDesktop }) => (isDesktop ? '1240px' : '100%')};
  height: ${({ pageHeight }) => pageHeight}px;
  display: flex;
  flex-wrap: ${({ isDesktop }) => (isDesktop ? 'wrap' : 'nowrap')};
  align-items: flex-start;
  justify-content: space-between;
  border-radius: 4px;
  margin: 21px auto 51px;
  flex-direction: ${({ isDesktop }) => (isDesktop ? 'row' : 'column')};
`;

export const FooterPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 28px auto 0;
  width: ${({ isDesktop }) => (isDesktop ? '1240px' : '100%')};
  height: 48px;
  background: #fff;
  border-radius: 4px;
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
  width: ${({ isDesktop }) => (isDesktop ? '1240px' : '100%')};
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

export const NullBlogPost = styled.div`
  display: flex;
  opacity: 0;
  flex-direction: column;
  width: ${({ isDesktop }) => (isDesktop ? '295px' : '100%')};
  height: 332px;
`;
