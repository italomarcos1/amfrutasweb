import styled from 'styled-components';
import { Form } from '@unform/web';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ isDesktop }) => (isDesktop ? '821px' : '100%')};
  overflow-x: hidden;
`;

export const Content = styled.div`
  width: ${({ isDesktop }) => (isDesktop ? '821px' : '100%')};
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: ${({ isDesktop }) => (isDesktop ? 'row' : 'column')};

  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 840px;
    height: 455px;
    margin-top: 30px;
  }
`;

export const InfoContainer = styled(Form)`
  width: ${({ isDesktop }) => (isDesktop ? '517px' : '100%')};
  height: ${({ isDesktop }) => (isDesktop ? 470 : 690)}px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;

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
