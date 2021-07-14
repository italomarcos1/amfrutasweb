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

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ isDesktop }) => (isDesktop ? '862px' : '100%')};
  height: 71px;
  margin: 0 auto;
  position: relative;
`;

export const FlagContainer = styled.div`
  display: flex;
  left: -150px;
  position: absolute;

  @media (max-width: 600px) {
    flex-direction: column;
    left: 5%;
  }
`;

export const Flag = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  opacity: ${({ active }) => (active ? 1 : 0.4)};

  img {
    width: 40px;
    height: 40px;
  }

  @media (max-width: 600px) {
    width: 20px;
    height: 20px;

    img {
      width: 20px;
      height: 20px;
    }
  }

  /* object-fit: cover; */
`;

export const PtFlag = styled(Flag)`
  margin-left: 25px;

  @media (max-width: 600px) {
    margin-left: 0px;
    margin-top: 10px;
  }
`;

export const Menu = styled.div`
  width: 100%;
  height: 41px;
  background-color: #0cb68b;
  /* background-color: #404; */
  position: relative;
  transition: all 0.2s;
  z-index: 999;
`;

export const MenuContent = styled.div`
  width: ${({ isDesktop }) => (isDesktop ? '1122px' : '100%')};
  padding: ${({ isDesktop }) => (isDesktop ? 0 : '0 10px')};
  height: 41px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MenuItem = styled(Link)`
  font-family: ${({ selected }) => (selected ? 'SFProBold' : 'SFPro')};
  font-size: 15px;
  line-height: 20px;
  letter-spacing: 0px;
  color: #fff;
  padding: ${({ isDesktop }) => (isDesktop ? '0 20px' : '0 5px')};
  padding-left: 20px;
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

export const MenuItemButton = styled.button.attrs({
  type: 'button',
})`
  font-family: ${({ selected }) => (selected ? 'SFProBold' : 'SFPro')};
  font-size: 15px;
  line-height: 20px;
  letter-spacing: 0px;
  color: #ffffff;
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
  height: ${({ isDesktop }) => (isDesktop ? 40 : 95)}px;
  padding: 0 16px;
  background-color: #ededed;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-family: 'SFProBold';
  font-size: ${({ isDesktop }) => (isDesktop ? 12 : 14)}px;
  line-height: ${({ isDesktop }) => (isDesktop ? 16 : 18)}px;
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
