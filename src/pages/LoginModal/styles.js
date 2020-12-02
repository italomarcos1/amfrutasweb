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
  width: 820px;
  height: 566px;
`;

export const LoginDetails = styled.div`
  width: 569px;
  height: 566px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.div`
  display: flex;
  width: 569px;
`;

export const HeaderButton = styled.div`
  width: 250px;
  height: 61px;
  border-top: 7px #2cbdd3 solid;
  border-color: ${({ active }) => (active ? '#2cbdd3' : '#EDEDED')};
  font-family: 'SFPro';
  font-size: 18px;
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
  width: 69px;
  height: 61px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;

  img {
    width: 35px;
    height: 35px;
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
