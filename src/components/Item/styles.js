import styled from 'styled-components';

export const Container = styled.li`
  width: 400px;
  height: 147px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 6px;
  list-style: none;
  z-index: 1;
`;

export const ItemPicture = styled.img`
  width: 70px;
  height: 70px;
`;

export const Title = styled.h1`
  text-align: left;
  font-weight: normal;
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

export const Price = styled.strong`
  text-align: right;
  font-family: 'SFProCustomBold';
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0px;
  color: #393939;
  align-self: flex-end;
`;

export const PriceAndAmount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: flex-end;
  width: 75%;
  margin-top: 10px;
  height: 21px;

  small {
    text-align: right;
    text-decoration: line-through;
    font-family: 'SFProCustomBold';
    font-size: 18px;
    line-height: 22px;
    letter-spacing: 0px;
    color: #f03f39;
    align-self: flex-end;
  }

  strong {
    text-align: right;
    font-family: 'SFProCustomBold';
    font-size: 18px;
    line-height: 22px;
    letter-spacing: 0px;
    color: #393939;
    align-self: flex-end;
  }
`;

export const Separator = styled.hr`
  width: 100%;
  color: #e0e0e0;
  opacity: 0.3;
  height: 1px;
  margin: 10.5px auto 0;
`;

export const Options = styled.div`
  display: flex;
  height: 59.5px;
  width: 100%;
  /* background-color: #4f4; */
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 36%;
    height: 100%;

    strong {
      font-weight: normal;
      font-size: 18px;
      color: #393939;
      font-family: 'SFPro';
      font-size: 18px;
      line-height: 22px;
      letter-spacing: 0px;
      text-align: center;
      margin: 0 11px;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      width: 45px;
      height: 45px;
      padding-left: 0;
      background-color: #f2f2f2;
      border-radius: 4px;

      img {
        width: 35%;
        margin: 0 auto;
      }
    }
  }
`;

export const DeleteItem = styled.button`
  background: #f84c4c;
  border-radius: 4px;
  opacity: 1;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 60%;
    margin: 0 auto;
  }
`;
