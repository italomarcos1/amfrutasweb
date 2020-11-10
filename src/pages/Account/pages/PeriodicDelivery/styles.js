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

export const Receive = styled.div`
  display: flex;
  align-items: center;
  width: 840px;
  height: 74px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-top: 20px;
  padding-left: 30px;
  padding-right: 30px;

  small {
    display: inline-block;
    font-weight: normal;
    font-size: 15px;
    line-height: 22px;
    font-family: 'SFPro';
    letter-spacing: 0px;
    color: #393939;
  }
`;

export const ReceiveContainer = styled.div`
  display: flex;
  align-items: center;
  height: 74px;
  padding-left: 30px;
  padding-right: 30px;
`;

export const StartDate = styled.div`
  display: flex;
  height: 74px;
  align-items: center;
  justify-content: center;
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  padding-left: 26.5px;
  padding-right: 25.5px;

  strong {
    font-weight: normal;
    font-family: 'SFPro';
    font-size: 15px;
    line-height: 22px;
    color: #393939;
    margin-right: 12px;
  }
`;

export const Options = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 103px;
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
    background-color: #f2f2f2;
    border-radius: 4px;
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

export const FirstProducts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 400px;
  height: 334px;
`;

export const ProductsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 27px;
`;
