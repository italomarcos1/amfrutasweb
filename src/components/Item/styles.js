import styled from 'styled-components';

export const Container = styled.li`
  width: ${({ isDesktop }) => (isDesktop ? '400px' : '100%')};
  height: 147px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 6px;
  list-style: none;
  z-index: 1;
  margin-top: ${({ isDesktop, index }) =>
    isDesktop ? 0 : index > 0 ? 20 : 0}px;
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
  height: ${({ isDesktop }) => (isDesktop ? 42 : 45)}px;
  width: ${({ isDesktop }) => (isDesktop ? 245 : 165)}px;
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
      font-size: ${({ isDesktop }) => (isDesktop ? 18 : 16)}px;
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
      height: ${({ isDesktop }) => (isDesktop ? 45 : 35)}px;
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
  width: ${({ isDesktop }) => (isDesktop ? 45 : 35)}px;
  height: ${({ isDesktop }) => (isDesktop ? 45 : 35)}px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 60%;
    margin: 0 auto;
  }
`;
