import styled from 'styled-components';
import { Form } from '@unform/web';

export const Background = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;
  z-index: 1099;
`;

export const Container = styled(Form)`
  display: flex;
  align-items: center;
  width: ${({ isDesktop }) => (isDesktop ? '820px' : '90%')};
  height: ${({ isDesktop }) => (isDesktop ? '566px' : '90%')};
`;

export const LoginDetails = styled.div`
  width: ${({ isDesktop }) => (isDesktop ? '569px' : '100%')};
  height: ${({ isDesktop }) => (isDesktop ? '566px' : '100%')};
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.div`
  display: flex;
  width: ${({ isDesktop }) => (isDesktop ? '569px' : '100%')};
`;

export const HeaderButton = styled.div`
  width: ${({ isDesktop }) => (isDesktop ? '250px' : '42.5%')};
  height: 61px;
  border-top: 7px #2cbdd3 solid;
  border-color: ${({ active }) => (active ? '#2cbdd3' : '#EDEDED')};
  font-family: 'SFPro';
  font-size: ${({ isDesktop }) => (isDesktop ? 18 : 16)}px;
  line-height: 22px;
  letter-spacing: 0px;
  color: ${({ active }) => (active ? '#181818' : '#7F7F7F')};
  background-color: ${({ active }) => (active ? '#fff' : '#EDEDED')};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
`;

export const CloseButton = styled.button`
  width: ${({ isDesktop }) => (isDesktop ? '69px' : '15%')};
  height: 61px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;

  img {
    width: ${({ isDesktop }) => (isDesktop ? 35 : 30)}px;
    height: ${({ isDesktop }) => (isDesktop ? 35 : 30)}px;
  }
`;

export const ShopDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 251px;
  height: 502px;
  background-color: #2cbdd3;
  padding: 55px 25px;
  text-align: center;

  p {
    font-family: 'SFPro';
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0px;
    color: #fff;
    margin-top: 20px;
  }
`;
