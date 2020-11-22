import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { lighten } from 'polished';

export const Header = styled.div`
  display: flex;
  width: 100%;
  height: 91px;
  background: #0cb68b;
  align-items: center;
  position: fixed;
  z-index: 999;

  div {
    &.content {
      display: flex;
      width: 1240px;
      height: 91px;
      margin: 0 auto;
    }
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  padding: 27px 0px 19px;
  width: 880px;
`;

export const Logo = styled(Link)`
  background: none;
  width: 196px;
  height: 43px;
  user-select: none;

  img {
    user-select: none;
  }
`;

export const BackButton = styled(Link)`
  width: 100px;
  height: 45px;
  background: #fff;
  border-radius: 6px;

  font-family: 'SFPro';
  font-size: 14px;
  line-height: 14px;
  letter-spacing: 0px;
  color: #0cb68b;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 60px;
`;

export const MyOrdersButton = styled(Link)`
  width: 154px;
  height: 45px;
  background: #088061;
  border-radius: 6px;

  font-family: 'SFPro';
  font-size: 14px;
  line-height: 14px;
  letter-spacing: 0px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 6px;

  &:hover {
    transition: background 0.1s;
    background: ${lighten('0.02', '#088061')};
  }
`;

export const SubHeader = styled.div`
  width: 498px;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-left: 12.5px;
  position: relative;
  background-color: #0cb68b;
  /* background-color: #00f; */
  margin-left: 20px;
`;

export const Line = styled.hr`
  color: #fff;
  width: 398.4px;
  height: 1px;
  border: 1px solid #fff;
  /* margin: 10.5px auto 8.5px; */
  position: absolute;
  top: 42px;
  left: 12px;
`;

export const OptionContainer = styled.button.attrs({
  type: 'button',
})`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  height: 65px;
  z-index: 2;
  background: none;

  &[disabled] {
    opacity: 1;
  }
`;

export const OptionTitle = styled.strong`
  text-align: center;
  font-family: 'SFPro';
  font-size: 18px;
  line-height: 18px;
  letter-spacing: 0px;
  color: #fff;
  opacity: 1;
  height: 21px;
`;

export const OptionNumber = styled.div`
  width: 34px;
  height: 34px;
  background-color: ${({ active }) => (active ? '#fff' : '#0CB68B')};
  border-radius: 50%;
  border: 2px solid #fff;
  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'SFProBold';
  font-size: 18px;
  line-height: 33px;
  letter-spacing: 0px;
  color: ${({ active }) => (active ? '#0CB68B' : '#fff')};
`;

export const OptionBorder = styled.div`
  width: 44px;
  height: 44px;
  background-color: ${({ active }) => (active ? 'none' : '#0CB68B')};

  border-radius: 50%;
  padding: 1px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
