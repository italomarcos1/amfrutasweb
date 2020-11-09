import styled from 'styled-components';

export const Container = styled.li`
  width: 370px;
  height: 120px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 6px;
  list-style: none;
`;

export const ItemPicture = styled.img`
  width: 70px;
  height: 70px;
`;

export const Title = styled.h1`
  text-align: left;
  font-family: 'SFPro';
  font-size: 15px;
  line-height: 22px;
  letter-spacing: 0px;
  color: #393939;
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  height: 70px;
  justify-content: space-between;
  align-items: flex-start;
  width: 80%;
  /* background-color: #f2f202; */
`;

export const PriceAndAmount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: flex-end;
  width: 75%;

  height: 21px;

  small {
    text-align: right;
    font-family: 'SFProBold';
    font-size: 14px;
    line-height: 22px;
    letter-spacing: 0px;
    color: #393939;
    align-self: flex-end;
  }

  strong {
    text-align: right;
    font-family: 'SFProBold';
    font-size: 18px;
    line-height: 22px;
    letter-spacing: 0px;
    color: #393939;
    align-self: flex-end;
  }
`;

export const Options = styled.div`
  display: flex;
  height: 27px;
  width: 358px;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;

  button {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-align: center;
    width: 185px;
    height: 27px;
    padding: 5px 7px;
    background-color: #0cb68b;
    border-radius: 4px;

    small {
      font-family: 'SFPro';
      font-size: 12px;
      line-height: 12px;
      letter-spacing: 0px;
      color: #fff;
    }

    img {
      width: 17px;
      margin: 17px;
      margin-right: 5px;
      margin-left: 0px;
    }
  }
`;
