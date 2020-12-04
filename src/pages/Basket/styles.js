import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 100%;
  padding: 27px 30px 146px;
`;

export const Content = styled.div`
  width: 1240px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin: 94.5px auto 0;

  /*ul {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 840px;
    max-height: 708px;
    margin-top: 27px;
  }*/
`;

export const MinValueContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: space-between;
  height: 60px;
  margin-top: 30px;
`;

export const MinValue = styled.div`
  display: flex;
  width: 400px;
  align-items: center;
  justify-content: center;
  height: 58px;
  padding: 5px 10px;
  background-color: #f84c4c;
  font-family: 'SFPro';
  font-size: 14px;
  line-height: 21px;
  color: #fff;
  border-radius: 4px;
`;

export const Title = styled.h1`
  font-family: 'SFPro';
  font-size: 25px;
  line-height: 33px;
  letter-spacing: 0px;
  color: #000;
  font-weight: normal;
`;

export const CheckoutDetails = styled.div`
  width: 360px;
  height: 622px;
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
    font-weight: normal;
    text-align: left;
    font-family: 'SFPro';
    font-size: 15px;
    line-height: 22px;
    letter-spacing: 0px;
    color: #393939;

    b {
      font-weight: bold;
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
  margin-top: 40px;

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
