import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  padding: 10px;
  padding-right: ${({ isDesktop }) => (isDesktop ? 21 : 10)}px;

  align-items: center;
  justify-content: space-between;
  background-color: #fff;

  width: ${({ isDesktop }) => (isDesktop ? '995px' : '100%')};
  flex-direction: ${({ isDesktop }) => (isDesktop ? 'row' : 'column')};

  height: ${({ isDesktop }) => (isDesktop ? 48 : 126)}px;
  border-radius: 4px;
  position: relative;
`;

export const FilterProductsContainer = styled.div`
  width: ${({ isDesktop }) => (isDesktop ? '200px' : '100%')};
  align-items: flex-start;
  justify-content: flex-start;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  position: relative;
`;

export const FilterProducts = styled.button.attrs({
  type: 'button',
})`
  width: ${({ isDesktop }) => (isDesktop ? '200px' : '100%')};
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
  width: ${({ isDesktop }) => (isDesktop ? '200px' : '100%')};
  height: 140px;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  position: absolute;
  z-index: ${({ visible }) => (visible ? 999 : -1)};
  top: 28px;
`;

export const FilterProductsOption = styled.button.attrs({
  type: 'button',
})`
  width: ${({ isDesktop }) => (isDesktop ? '200px' : '100%')};
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
