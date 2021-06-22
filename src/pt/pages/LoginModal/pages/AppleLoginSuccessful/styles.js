import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: #efefef;

  h1 {
    font-weight: normal;
    font-size: ${({ isDesktop }) => (isDesktop ? '22px' : '20px')};
    line-height: ${({ isDesktop }) => (isDesktop ? '29px' : '22px')};
    font-family: 'SFProBold';
    letter-spacing: 0px;
    color: #0a0a0a;
  }

  small {
    display: block;
    margin-top: ${({ isDesktop }) => (isDesktop ? '2.5px' : '7.5px')};

    font-size: 15px;
    line-height: 20px;
    font-family: 'SFPro';
    letter-spacing: 0px;
    color: #8d8d8d;
  }
`;
