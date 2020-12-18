import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 193px;
  justify-content: flex-start;
  /* background-color: #c00; */
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-top: ${({ index }) => (index > 0 ? 20 : 0)}px;
`;

const rotate = keyframes` /** animação para rotacionar o icon. */
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const LoadingContainer = styled.div`
  width: 100%;
  height: 454px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 27px;

  strong {
    display: inline-block;
    font-family: 'SFPro';
    font-weight: normal;
    font-size: 20px;
    line-height: 36px;
    letter-spacing: 0px;
    color: #666;
    margin-top: 27px;
  }

  svg {
    animation: ${rotate} 2s linear infinite;
  }
`;

export const OrderStatus = styled.div`
  display: flex;
  width: 100%;
  height: 159.5px;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  width: 100%;
  height: 111px;
  /* background-color: #ff0; */
  margin-top: 10px;
  padding: 0 5px 0;

  h1 {
    font-weight: normal;
    font-size: 22px;
    line-height: 26px;
    font-family: 'SFPro';
    letter-spacing: 0px;
    color: ${({ color }) => color};
  }
`;

export const OrderInfoContainer = styled.div`
  display: flex;
  width: 100%;
  /* background-color: #0f00e0; */
  height: 35px;
  align-items: center;
  justify-content: space-between;
`;

export const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: 32px;
  margin-top: 0;
  padding-top: 0;
  /* background-color: #ccf000; */

  strong {
    font-weight: normal;
    font-size: 11px;
    line-height: 15px;
    font-family: 'SFPro';
    letter-spacing: 0px;
    color: #9e9e9e;

    b {
      font-weight: normal;
      color: #424242;
    }
  }
`;

export const Button = styled.button.attrs({ type: 'button' })`
  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;
  width: 118px;
  height: 27px;
  padding: 0 7px;
  background-color: #29b4cc;

  border-radius: 4px;
  margin-right: 0px;

  &:hover {
    transition: all 0.2s;
  }

  small {
    font-family: 'SFPro';
    font-size: 12px;
    margin-top: 0;
    padding: 0;
    border: 0;

    /* line-height: 12px; */
    letter-spacing: 0px;
    color: #fff;
  }

  img {
    width: 13px;
    height: 14px;
    margin-right: 5px;
    margin-left: 0px;
  }
`;

export const ShippingInfoSeparator = styled.div`
  border: 1px solid #e0e0e0;
  height: 0px;
  width: 100%;
  background-color: #e0e0e0;
  margin-top: 0px;
  margin-bottom: 21.5px;
  display: ${({ open }) => (open ? 'block' : 'none')};
`;

export const ShippingInfo = styled.div`
  display: ${({ open }) => (open ? 'flex' : 'none')};
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 112px;
  /* background-color: #624; */

  padding-left: 10px;

  small {
    text-align: left;
    margin-top: 8px;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    font-family: 'SFPro';
    letter-spacing: 0px;
    color: #424242;
    /* background-color: #ff4242; */

    b {
      text-align: left;
      font-weight: normal;
      font-size: 12px;
      line-height: 14px;
      font-family: 'SFPro';
      letter-spacing: 0px;
      color: #9e9e9e;
    }

    & + small {
      margin-top: 5px;
    }
  }
`;
