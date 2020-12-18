import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { darken } from 'polished';

export const Header = styled.div`
  width: 100%;
  height: 71px;
  background-color: #000;
  position: relative;
  z-index: 999;
`;

export const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;

  ul {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0.1px;
  }
`;

export const MenuMobile = styled.div`
  width: 80%;
  height: 100%;
  background-color: #0cb68b;
  z-index: 999;
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
`;

export const Title = styled.div`
  width: 100%;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #0cb68b;
  background-color: #fff;
  font-family: 'SFProBold';
  font-size: 16px;
  line-height: 19px;
  font-weight: bold;
  padding: 0 9.5px;
  border-bottom: 1px solid #ccc;
`;

export const MenuItem = styled(Link)`
  width: 100%;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #141319;
  background-color: #fff;
  font-family: 'SFPro';
  font-size: 13px;
  line-height: 14px;
  font-weight: normal;
  padding: 0 9.5px;
  border-bottom: 1px solid #ccc;
`;

export const Separator = styled.div`
  width: 100%;
  height: 18px;
  background-color: #0cb68b;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ isDesktop }) => (isDesktop ? '862px' : '100%')};
  height: 71px;
  margin: 0 auto;
  /* position: relative; */
`;

export const Menu = styled.div`
  width: 100%;
  height: 41px;
  background-color: #0cb68b;
  position: relative;
  transition: all 0.2s;
  z-index: 999;
`;

export const MenuContent = styled.div`
  width: 100%;
  padding: 0 4px;
  height: 41px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MenuItemButton = styled.button.attrs({
  type: 'button',
})`
  font-family: ${({ selected }) => (selected ? 'SFProBold' : 'SFPro')};
  font-size: 15px;
  line-height: 20px;
  letter-spacing: 0px;
  color: #fff;
  padding: 0 10px;
  text-align: center;
  height: 37px;
  display: flex;
  align-items: center;
  background: none;

  img {
    width: 18px;
    height: 18px;
  }
`;
export const MenuItemLink = styled.a`
  font-family: 'SFPro';
  font-size: 15px;
  line-height: 20px;
  letter-spacing: 0px;
  color: #141319;
  background-color: #fff;
  padding: 0 10px;
  text-align: center;
  height: 37px;
  display: flex;
  align-items: center;
  font-size: 13px;
  line-height: 15px;
  border-bottom: 1px solid #ccc;

  img {
    width: 18px;
    height: 18px;
  }
`;

export const Price = styled.strong`
  text-align: left;
  font-family: 'SFPro';
  font-size: 15px;
  line-height: 20px;
  letter-spacing: 0px;
  color: #fff;
`;

export const Badge = styled.span`
  height: 19px;
  width: 19px;
  position: absolute;
  top: 16px;
  left: 20px;
  background-color: #318d68;
  font-family: 'SFPro';
  font-size: 11px;
  line-height: 18px;
  letter-spacing: 0px;
  color: #fff;
  border-radius: 50%;
  text-align: center;
`;

export const BadgeContainer = styled.span`
  height: 39px;
  width: 39px;
  position: relative;
  margin-right: 7px;
`;

export const SubTitle = styled.div`
  width: 100%;
  height: ${({ isDesktop }) => (isDesktop ? 40 : 108)}px;
  padding: 0 16px;
  background-color: #ededed;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-family: 'SFProBold';
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0px;
  color: #000;
  position: relative;
  transition: all 0.2s;
  z-index: 999;
`;

export const GoToCartContainer = styled.button.attrs({
  type: 'button',
})`
  display: flex;
  align-items: center;
  background-color: #0cb68b;
  transition: all 0.2s;
  padding-right: 4px;

  &:hover {
    background-color: ${darken('0.05', '#0cb68b')};
  }
`;
