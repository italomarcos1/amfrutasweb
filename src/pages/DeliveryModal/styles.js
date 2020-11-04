import styled from 'styled-components';

export const Background = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;
`;

export const Container = styled.div`
  width: 875px;
  height: 563px;
  background-color: #fff;
  box-shadow: 0px 0px 60px #00000029;
  border-radius: 20px;
  padding: 0 0 55px 55px;
`;

export const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 59px;
`;

export const Header = styled.div`
  width: 100%;
  height: 42px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 12.5px;
  padding-top: 20px;

  button {
    width: 37px;
    height: 37px;
    background: none;
    border: none;

    img {
      width: 35px;
      height: 35px;
    }
  }
`;

export const Content = styled.div`
  height: 466px;
`;

export const PeriodDelivery = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 83px;

  span {
    margin-left: 14.5px;
  }

  p {
    font-family: 'SFPro';
    font-size: 26px;
    line-height: 34px;
    color: #767676;
    text-align: left;
  }

  img {
    height: 83px;
    width: 90px;
  }
`;

export const Title = styled.div`
  text-align: left;
  font-family: 'SFPro';
  font-size: 30px;
  line-height: 32px;
  letter-spacing: 0px;
  color: #0cb68b;
  margin-top: 23px;

  b {
    font-family: 'SFProSemibold';
  }
`;

export const Item = styled.div`
  display: flex;
  text-align: left;

  img {
    width: 30px;
    height: 30px;
    margin-top: 7.5px;
  }

  span {
    margin-left: 7.5px;

    strong {
      font-family: 'SFProSemibold';
      font-size: 20px;
      line-height: 22px;
      color: #4d4d4d;
    }

    p {
      display: block;
      font-family: 'SFPro';
      font-size: 16px;
      line-height: 22px;
      letter-spacing: 0px;
      color: #b0b0b0;
    }
  }

  & + div {
    margin-top: 15px;
  }
`;
