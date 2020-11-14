import styled from 'styled-components';
import { darken } from 'polished';

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 441px;
  height: 55px;
  background-color: ${({ color }) => color};
  box-shadow: 0px 4px 0px ${({ shadowColor }) => shadowColor};
  border-radius: 4px;
  font-family: 'SFPro';
  font-size: 18px;
  line-height: 22px;
  color: #fff;
  margin-top: 20px;

  &:hover {
    background-color: ${({ color }) => darken(0.05, color)};
    transition: all 0.2s;
  }

  b {
    font-family: 'SFProBold';
  }
`;

export const Title = styled.div`
  font-family: 'SFPro';
  font-size: 18px;
  line-height: 22px;
  color: #7f7f7f;
  margin: 30px auto 0;
  text-align: center;

  b {
    font-family: 'SFProBold';
  }
`;

export const InputContainer = styled.div`
  display: flex;
  width: 462px;
  height: 53px;
  justify-content: space-between;
  margin-top: 20px;
`;

export const GoBack = styled.button.attrs({
  type: 'button',
})`
  text-align: left;
  font-family: 'SFPro';
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0px;
  color: #181818;
  margin-top: 28px;
  text-transform: uppercase;
  background: none;

  &::after {
    content: '';
    display: block;
    width: 100%;
    margin-top: 2px;
    height: 2px;
    background-color: #181818;
  }
`;

export const SecureLogin = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0px;
  font-family: 'SFPro';
  font-size: 12px;
  line-height: 22px;
  color: #7f7f7f;
  height: 31px;
  text-transform: uppercase;
  margin-top: 49px;

  img {
    margin: 0 13px;
    width: 24px;
  }
`;

export const ForgotPassword = styled.button.attrs({
  type: 'button',
})`
  text-align: left;
  font-family: 'SFPro';
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0px;
  color: #f03f39;
  margin-top: 14px;
  align-self: flex-start;
  background: none;

  &::after {
    content: '';
    display: block;
    width: 100%;
    margin-top: 3px;
    height: 1px;
    background-color: #f03f39;
  }

  &:hover {
    font-family: 'SFProBold';
  }
`;
