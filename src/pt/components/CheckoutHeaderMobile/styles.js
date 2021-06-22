import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  width: 100%;
  height: 51px;
  align-items: center;
  justify-content: center;
  background-color: #0cb68b;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;

  button {
    background: none;
    border: none;
  }
`;

export const SubHeader = styled.div`
  width: 100%;
  height: 59px;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-around;
  padding-left: 12.5px;
  background-color: #0cb68b;
  margin-top: 51px;
`;

export const Line = styled.hr`
  color: #fff;
  width: 80%;
  height: 1px;
  border: 1px solid #fff;
  /* margin: 10.5px auto 8.5px; */
  position: absolute;
  top: 37px;
  left: 12px;
`;

export const OptionContainer = styled.button.attrs({
  type: 'button',
})`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  height: 41px;
  z-index: 2;
  background: none;

  &[disabled] {
    opacity: 1;
  }
`;

export const OptionTitle = styled.strong`
  text-align: center;
  font-family: 'SFPro';
  font-size: 14px;
  line-height: 14px;
  letter-spacing: 0px;
  color: ${({ disabled }) => (disabled ? '#999' : '#fff')};
  opacity: 1;
  height: 14px;
`;

export const OptionNumber = styled.div`
  width: 22px;
  height: 22px;
  background-color: ${({ active }) => (active ? '#fff' : '#0cb68b')};
  border-radius: 50%;
  border: 2px solid #fff;
  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'SFProBold';
  font-size: 12px;
  line-height: 22px;
  letter-spacing: 0px;
  color: ${({ active }) => (active ? '#0cb68b' : '#fff')};
`;
