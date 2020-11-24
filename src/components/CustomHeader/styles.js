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
