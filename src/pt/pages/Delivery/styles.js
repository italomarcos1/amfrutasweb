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
  display: flex;
  width: ${({ isDesktop }) => (isDesktop ? '1240px' : '100%')};
  flex-direction: ${({ isDesktop }) => (isDesktop ? 'row' : 'column')};
  align-items: flex-start;
  justify-content: space-between;
  margin: 94.5px auto 0;
  margin-top: ${({ isDesktop }) => (isDesktop ? 94.5 : 23.75)}px;

  /* ul {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 840px;
    height: 455px;
    margin-top: 30px;
  }*/
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
  width: ${({ isDesktop }) => (isDesktop ? '683px' : '100%')};
  height: ${({ isDesktop }) => (isDesktop ? 399 : 792)}px;
  margin-top: ${({ isDesktop }) => (isDesktop ? 0 : 30)}px;

  background-color: rgba(255, 255, 255, 0.4);
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 997;

  svg {
    z-index: 998;
    animation: ${rotate} 2s linear infinite;
  }
`;

export const DeliveryOptionsContainer = styled.div`
  width: ${({ isDesktop }) => (isDesktop ? '1240px' : '100%')};
  display: flex;
  margin: 0 auto;
  height: ${({ isDesktop }) => (isDesktop ? 100 : 390)}px;
  align-items: center;
  justify-content: space-between;
  flex-direction: ${({ isDesktop }) => (isDesktop ? 'row' : 'column')};
`;

export const DeliveryButton = styled.button`
  width: ${({ isDesktop }) => (isDesktop ? '208px' : '50%')};
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
  justify-content: center;
  width: ${({ isDesktop }) => (isDesktop ? '104px' : '80%')};
  height: 90px;
`;

export const DeliveryButtonContent = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${({ isDesktop }) => (isDesktop ? 42 : 60)}px;

  border-bottom: 2px solid #fff;
  border-color: ${({ selected }) => (selected ? '#fff' : '#000')};
  padding-bottom: ${({ isDesktop }) => (isDesktop ? 4.5 : 9.5)}px;

  margin-bottom: 4.5px;

  img {
    margin-right: 7.5px;
  }
`;

export const DeliveryDateContainer = styled.div`
  width: ${({ isDesktop }) => (isDesktop ? '384px' : '100%')};
  flex-direction: ${({ isDesktop }) => (isDesktop ? 'row' : 'column')};
  height: ${({ isDesktop }) => (isDesktop ? 100 : 182)}px;
  /* width: ${({ isDesktop }) => (isDesktop ? '245px' : '100%')}; */
  margin-top: ${({ isDesktop }) => (isDesktop ? 0 : 20)}px;

  background: #fff;
  border: 1px solid #e0e0e0;
  border-color: ${({ error }) => (error ? '#f53030' : '#e0e0e0')};
  border-width: ${({ error }) => (error ? 2 : 1)}px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: ${({ isDesktop }) => (isDesktop ? 'flex-start' : 'center')};
  padding-left: ${({ isDesktop }) => (isDesktop ? 25 : 0)}px;

  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    height: ${({ isDesktop }) => (isDesktop ? 53 : 95)};

    strong {
      width: 269px;
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
  width: ${({ isDesktop }) => (isDesktop ? '517px' : '100%')};
  height: ${({ isDesktop }) => (isDesktop ? 399 : 571)}px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;

  opacity: ${({ loading }) => (loading ? 0.4 : 1)};
  padding: ${({ isDesktop }) => (isDesktop ? '21px 29px 36px 27px' : '19px')};
`;

export const SectionTitle = styled.div`
  display: block;
  text-align: left;
  width: ${({ isDesktop }) => (isDesktop ? '1240px' : '100%')};
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
  width: ${({ isDesktop }) => (isDesktop ? '360px' : '100%')};
  height: ${({ isDesktop }) => (isDesktop ? 708.5 : 798.5)}px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${({ isDesktop }) => (isDesktop ? 27 : 47)}px;
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
  width: ${({ isDesktop }) => (isDesktop ? '213px' : '69%')};
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
  width: ${({ isDesktop }) => (isDesktop ? '95px' : '31%')};
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

export const LoadingCoupon = styled.button.attrs({
  type: 'button',
})`
  width: ${({ isDesktop }) => (isDesktop ? '308px' : '100%')};

  height: 50px;
  background: #0cb68b;
  border-radius: 2px;

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    animation: ${rotate} 2s linear infinite;
  }
`;

export const CouponIsValid = styled.button.attrs({
  type: 'button',
})`
  width: ${({ isDesktop }) => (isDesktop ? '308px' : '100%')};

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
  width: ${({ isDesktop }) => (isDesktop ? '360px' : '100%')};

  height: ${({ isDesktop }) => (isDesktop ? '100px' : '120px')};
  margin-top: ${({ isDesktop }) => (isDesktop ? 0 : 20)}px;

  text-align: left;
  font-family: 'SFPro';
  font-size: ${({ isDesktop }) => (isDesktop ? 15 : 13)}px;
  line-height: ${({ isDesktop }) => (isDesktop ? 22 : 19)}px;
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
  width: ${({ isDesktop }) => (isDesktop ? '360px' : '100%')};
  padding: ${({ isDesktop }) => (isDesktop ? '17px 25px' : '8.5px 12.5px')};
  height: 100px;
  margin-top: ${({ isDesktop }) => (isDesktop ? 0 : 15)}px;

  text-align: left;
  font-family: 'SFPro';
  font-size: 13px;
  line-height: 16px;
  letter-spacing: 0.2px;
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
  margin-left: ${({ isDesktop }) => (isDesktop ? 140 : 0)}px;
  margin-top: ${({ isDesktop }) => (isDesktop ? 0 : 20)}px;

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
