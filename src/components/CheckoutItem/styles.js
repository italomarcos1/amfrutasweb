import styled from 'styled-components';

export const Container = styled.li`
  width: 400px;
  height: 82px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 6px;
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
  padding: 0;
  padding-right: 5px;
  text-transform: capitalize;
  height: 42px;
  width: 245px;
  letter-spacing: 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  background: none;
  text-align: left;
  /* background-color: #00f; */

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
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
    font-family: 'SFProCustomBold';
    font-size: 14px;
    line-height: 22px;
    letter-spacing: 0px;
    color: #393939;
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
