import styled from 'styled-components';

export const Title = styled.strong`
  text-align: left;
  display: block;
  font-weight: bold;
  text-align: left;
  font: bold 12px/16px 'SFProBold';
  letter-spacing: 0px;
  color: #424242;
  margin-bottom: 5px;
  height: 16px;
`;

export const Indicator = styled.span`
  align-self: stretch;
  background-color: #bec2c8;
  width: 1px;
  height: 30.5px;
  display: ${({ isFocused }) => (isFocused ? 'none' : 'block')};
  user-select: none;

  img {
    width: 30px;
    user-select: none;
  }
`;

export const Menu = styled.button.attrs({
  type: 'button',
})`
  padding: 2px 8px;
  background-color: #f4f5f8;
  color: #424242;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 32px;
  width: 213px;
  margin-left: 4px;

  font-size: 12px;
  line-height: 16px;
  font-family: 'SFPro';
  letter-spacing: 0px;

  span {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  img {
    margin-right: 10px;
  }
`;
