import styled from 'styled-components';

export default styled.div`
  width: ${({ isDesktop }) => (isDesktop ? '840px' : '100%')};
  height: ${({ isDesktop }) => (isDesktop ? 454 : 303)}px;
  /* background-color: #2cbdd3; */

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: 30px;
  text-align: center;

  img {
    width: ${({ isDesktop }) => (isDesktop ? 168 : 84)}px;
    height: ${({ isDesktop }) => (isDesktop ? 168 : 84)}px;
  }

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
`;
