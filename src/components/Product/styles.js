import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 176px;
  height: 376px;
  background-color: #fff;
  border-radius: 6px;
  justify-content: space-between;
  font-family: 'SFPro';
  padding: 8px;
`;

export const Title = styled(Link)`
  color: #393939;
  font-family: 'SFPro';
  font-size: 15px;
  line-height: 22px;
  padding: 0 5px 0 10px;
  margin: 10px 0;
  height: 62px;
  width: 156px;

  overflow: hidden;
  text-overflow: ellipsis;
  /* background-color: #ff4; */
`;

export const FavoriteButton = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 156px;
  margin: 10px 0px 0px 5px;
  background: none;
`;

export const ImageContainer = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;

  width: 100%;

  img {
    width: 100%;
  }
`;

export const PriceContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  height: 70px;
  width: 100%;
  padding: 0 10px;
  font-family: 'SFPro';
  margin-top: 10px;

  /* background-color: #404; */

  span {
    padding: 0;
    display: flex;
    color: #e2a63b;
    font-size: 8px;
    height: 20px;
    align-items: center;
    /* background-color: #4f4; */

    strong {
      font-size: 9px;
      font-family: 'SFProSemibold';
      margin-right: 1px;
    }
  }

  small {
    color: #989898;
    text-align: left;
    font-size: 12px;
    line-height: 22px;
    margin: 4px 0;
    p {
      margin-left: 5;
      display: inline;
      text-decoration: line-through;
    }
  }

  > strong {
    color: #393939;
    text-align: left;
    font-size: 20px;
    line-height: 22px;
    font-family: 'SFProSemiBold';
  }
`;

export const Options = styled.div`
  display: flex;
  height: 45px;
  width: 168px;
  /* background-color: #4f4; */
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 103px;
    height: 45px;
    /* margin-right: 12px; */

    strong {
      font-size: 18px;
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
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 45px;

    /* width: 45px; */
    /* height: 45px; */
    background-color: #4fb78d;
    border-radius: 4px;
  }
`;
