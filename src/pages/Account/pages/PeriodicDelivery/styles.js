import ReactInputMask from 'react-input-mask';
import styled from 'styled-components';

export const InfoContainer = styled.div`
  width: 841px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & + div {
    margin-top: 18px;
  }
`;

export const Options = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 135px;
  height: 45px;
  margin: 0 12px;

  strong {
    font-size: 18px;
    line-height: 22px;
    font-weight: normal;
    font-family: 'SFPro';
    color: #393939;
    margin: 0 10px;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 10px;
    height: 45px;
    max-width: 45px;
    background-color: #f2f2f2;
    border-radius: 4px;
  }
`;

export const StartDateInput = styled(ReactInputMask)`
  width: 171px;
  height: 32px;
  padding: 7px;
  padding-left: 8px;
  text-align: left;
  color: #424242;
  border: 1px solid #bec2c8;
  border-color: ${({ active, error }) =>
    active ? '#1DC167' : error ? '#f53030' : '#BEC2C8'};
  border-width: ${({ active, error }) => (active || error ? 2 : 1)}px;
  padding: ${({ active }) => (active ? 6 : 7)}px;

  border-radius: 2px;
  font-size: 12px;
  background: #fff;

  &::placeholder {
    text-align: left;
    font-style: italic;
    font-size: 12px;
    font-family: 'SFPro';
    line-height: 16px;
    letter-spacing: 0px;
    color: #bbbfc6;
    opacity: 1;
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

export const CheckoutDetails = styled.div`
  width: 400px;
  height: 334px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 29px 24px 38px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  border-bottom: 21px solid #0cb68b;
`;

export const CheckoutItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 51px;
  width: 100%;
  border-top: 1px solid #e0e0e0;
  padding: 13.5px 0;

  h1 {
    font-weight: normal;
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

export const Title = styled.h1`
  font-family: 'SFPro';
  font-size: 25px;
  line-height: 33px;
  letter-spacing: 0px;
  color: #000;
  font-weight: normal;
  margin-bottom: 18.5px;
`;
