import styled, { keyframes } from 'styled-components';
import { Form } from '@unform/web';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 100%;
  padding: 27px 30px 146px;
  overflow-x: hidden;
`;

export const Content = styled.div`
  width: 1240px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin: 94.5px auto 0;

  ul {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 840px;
    height: 455px;
    margin-top: 30px;
  }
`;

export const Title = styled.h1`
  font-family: 'SFPro';
  font-size: 25px;
  line-height: 33px;
  letter-spacing: 0px;
  color: #000;
  font-weight: normal;
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
  position: absolute;
  width: 683px;
  height: 431px;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    z-index: 998;
    animation: ${rotate} 2s linear infinite;
  }
`;

export const DeliveryOptionsContainer = styled.div`
  width: 1240px;
  display: flex;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
`;

export const DeliveryButton = styled.button`
  width: 208px;
  height: 100px;
  background-color: ${({ selected }) => (selected ? '#0cb68b' : '#EFEFEF')};
  border-radius: 6px;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: 'SFProBold';
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0px;
  color: ${({ selected }) => (selected ? '#fff' : '#000')};

  font-weight: bold;

  text-transform: uppercase;
`;

export const DeliveryButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 104px;
  height: 59px;
`;

export const DeliveryButtonContent = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 42px;

  border-bottom: 2px solid #fff;
  border-color: ${({ selected }) => (selected ? '#fff' : '#000')};
  padding-bottom: 4.5px;
  margin-bottom: 4.5px;

  img {
    margin-right: 7.5px;
  }
`;

export const DeliveryDateContainer = styled.div`
  width: 384px;
  height: 100px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    width: 335px;
    height: 53px;

    strong {
      width: 245px;
      height: 16px;
      text-align: left;
      color: #424242;
      font-family: 'SFProBold';
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0px;
    }

    > div {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
    }
  }
`;

export const InfoContainer = styled(Form)`
  width: 517px;
  height: 399px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;

  opacity: ${({ loading }) => (loading ? 0.4 : 1)};
  padding: 21px 29px 36px 27px;
`;

export const SectionTitle = styled.div`
  display: block;
  text-align: left;
  width: 1240px;
  margin: 0 auto;

  strong {
    font-weight: normal;
    font-size: 22px;
    line-height: 29px;
    font-family: 'SFProBold';
    letter-spacing: 0px;
    color: #000;
  }

  small {
    display: block;
    margin-top: 2.5px;
    font-size: 15px;
    line-height: 20px;
    font-family: 'SFPro';
    letter-spacing: 0px;
    color: #0cb68b;
  }
`;

export const CheckoutDetails = styled.div`
  width: 360px;
  height: 661px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 27px;
`;

export const CheckoutItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 47.5px;
  width: 100%;
  border-bottom: 1px solid #e0e0e0;
  padding: 13.5px 0;

  h1 {
    text-align: left;
    font-family: 'SFPro';
    font-size: 15px;
    line-height: 22px;
    letter-spacing: 0px;
    color: #393939;

    b {
      font-family: 'SFProBold';
    }
  }

  h2 {
    text-align: right;
    font-family: 'SFProBold';
    font-size: 20px;
    line-height: 22px;
    letter-spacing: 0px;
    color: #393939;
  }
`;

export const CouponInput = styled.input.attrs({
  type: 'text',
})`
  width: 213px;
  height: 50px;
  background: #f8f9fb;
  border: 1px solid #abacae;
  border-radius: 2px;
  padding: 14px 19px;
  color: #666;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;

  &::placeholder {
    color: #abacae;
  }
`;

export const SendButton = styled.button.attrs({
  type: 'button',
})`
  width: 95px;
  height: 50px;
  background: #0cb68b;
  border-radius: 2px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  font-family: 'SFPro';
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${darken('0.15', '#0cb68b')};
  }
`;

export const CouponIsValid = styled.button.attrs({
  type: 'button',
})`
  width: 308px;
  height: 50px;
  background: #0cb68b;
  border-radius: 2px;
  font-family: 'SFProBold';
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;

  &:hover {
    background-color: #f84c4c;
  }
`;

export const ConfirmationText = styled.small`
  letter-spacing: 0px;
  font-family: 'SFPro';
  font-size: 15px;
  line-height: 22px;
  letter-spacing: 0px;
  color: #0cb68b;
  margin-top: 27.5px;
  align-self: flex-start;
`;

export const ShippingWarning = styled.div`
  border-radius: 6px;

  padding: 17px 25px;
  width: 360px;
  height: 100px;

  text-align: left;
  font-family: 'SFPro';
  font-size: 15px;
  line-height: 22px;
  letter-spacing: 0px;
  background-color: #2cbdd3;
  color: #fff;

  b {
    font-family: 'SFProBold';
    margin-left: 3px;
  }
`;

export const TakeOnShop = styled.div`
  border-radius: 6px;

  padding: 17px 25px;
  width: 360px;
  height: 100px;

  text-align: left;
  font-family: 'SFPro';
  font-size: 13px;
  line-height: 22px;
  letter-spacing: 0px;
  background-color: #0cb68b;

  color: #fff;

  b {
    font-family: 'SFPro';
    font-size: 13px;
    line-height: 22px;
    font-family: 'SFProBold';
    margin-left: 3px;
  }
`;

export const StartStop = styled.div`
  display: flex;
  align-items: center;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    background-color: #fff;
    border: 3px solid #0cb68b;
    border-color: ${({ selected }) => (selected ? '#0cb68b' : '#ccc')};
    border-radius: 50%;
    margin-left: 0;
    padding: 2px;
    text-align: center;

    img {
      display: ${({ selected }) => (selected ? 'block' : 'none')};
      width: 15px;
      height: 15px;
    }
  }

  strong {
    font-size: 15px;
    line-height: 22px;
    font-weight: normal;
    font-family: 'SFPro';
    color: #393939;
    margin-left: 12px;
  }
`;

export const UseAddress = styled.button.attrs({
  type: 'button',
})`
  background: none;
  margin-left: 140px;
  small {
    display: block;
    margin-top: 2.5px;
    font-size: 15px;
    line-height: 20px;
    font-family: 'SFPro';
    letter-spacing: 0px;
    color: #0cb68b;

    &:hover {
      color: ${darken(0.1, '#0cb68b')};
    }
  }
`;
