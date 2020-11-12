import styled from 'styled-components';

export const Menu = styled.div`
  width: 100%;
  height: 41px;
  background-color: #0cb68b;
  top: 0px;
  position: fixed;
  z-index: 999;
`;

export const MenuContent = styled.div`
  width: 862px;
  height: 41px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MenuItem = styled.button.attrs({
  type: 'button',
})`
  font-family: ${({ selected }) => (selected ? 'SFProBold' : 'SFPro')};
  font-size: 15px;
  line-height: 20px;
  letter-spacing: 0px;
  color: #ffffff;
  padding: 0 1px;
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
  left: 13px;
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
`;

export const SubTitle = styled.div`
  width: 100%;
  height: 40px;
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
  /* top: 112px; */
  top: 41px;
  position: fixed;
  z-index: 999;
`;
