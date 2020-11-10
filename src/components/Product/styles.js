import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 176px;
  height: 376px;
  background-color: #fff;
  border-radius: 6px;

  border: 1px solid #f0f0f0;

  justify-content: space-between;
  font-family: 'SFPro';
  padding: 6px;
`;

export const Title = styled(Link)`
  color: #393939;
  font-family: 'SFPro';
  font-size: 15px;
  line-height: 22px;
  padding: 0 5px 0 4px;
  margin: 10px 0;
  height: 64px;
  width: 156px;
  letter-spacing: 0px;
  overflow: hidden;
  text-overflow: ellipsis;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  /* background-color: #ff4; */
`;

export const FavoriteButton = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 31px;
  margin: 10px 0px 0px 5px;
  background: none;
`;

export const ImageContainer = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  border-radius: 4px;

  width: 100%;

  img {
    border-radius: 4px;
    width: 100%;
  }
`;

export const PriceContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  height: 70px;
  width: 100%;
  padding: 0 10px;
  padding-left: 5px;
  font-family: 'SFPro';
  margin-top: 10px;
  letter-spacing: 0px;

  /* background-color: #404; */

  img {
    width: 30.3px;
    height: 20.5px;
    margin-right: 6px;
  }

  span {
    padding: 0;
    display: flex;
    color: #e2a63b;
    font-size: 10.5px;
    height: 20px;
    align-items: center;
    letter-spacing: 0px;
    font-family: 'SFPro';

    /* background-color: #4f4; */

    strong {
      font-size: 10.5px;
      font-family: 'SFProBold';
      margin-right: 3px;
      letter-spacing: 0px;
    }
  }

  small {
    color: #989898;
    text-align: left;
    font-size: 10px;
    line-height: 22px;
    margin-top: 2px;
    letter-spacing: 0px;
    font-family: 'SFPro';

    /* background-color: #4f4; */

    p {
      margin-left: 5px;
      display: inline;
      text-decoration: line-through;
      letter-spacing: 0px;
    }
  }

  > strong {
    color: #393939;
    text-align: left;
    font-size: 20px;
    line-height: 20px;
    font-family: 'SFProBold';
  }
`;

export const Options = styled.div`
  display: flex;
  height: 45px;
  width: 100%;
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
      font-weight: normal;
      font-family: 'SFPro';
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      padding: 10px;
      height: 45px;
      border-radius: 4px;
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
