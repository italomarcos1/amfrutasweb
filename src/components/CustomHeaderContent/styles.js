import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  padding: 10px;
  padding-right: 21px;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;

  width: 995px;
  height: 48px;
  border-radius: 4px;
  position: relative;
`;

export const FilterProductsContainer = styled.div`
  width: 200px;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: #f0f;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  position: relative;
`;

export const FilterProducts = styled.button.attrs({
  type: 'button',
})`
  width: 200px;
  height: 28px;
  background: #3ab879;
  border-radius: 4px;
  display: flex;
  padding-left: 15px;
  padding-right: 9px;
  align-items: center;
  justify-content: space-between;

  small {
    font-family: 'SFPro';
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0px;
    color: #fff;
  }

  img {
    width: 16px;
  }
`;

export const FilterProductsList = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 140px;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  position: absolute;
  z-index: 999;
  top: 28px;
`;

export const FilterProductsOption = styled.button.attrs({
  type: 'button',
})`
  width: 200px;
  height: 28px;
  display: flex;
  padding-left: 15px;
  padding-right: 9px;
  align-items: center;
  justify-content: flex-start;
  color: #333;
  background-color: #fff;
  transition: all 0.2s;

  font-family: 'SFPro';
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0px;

  &:hover {
    background-color: #3ab879;
    color: #fff;
  }
`;
