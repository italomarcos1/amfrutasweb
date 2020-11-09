import styled from 'styled-components';
import { Form } from '@unform/web';

export const Container = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 840px;
  height: ${({ open }) => (open ? '1131px' : '190px')};
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 18px 20px 12.5px 30px;

  ul {
    display: ${({ open }) => (open ? 'flex' : 'none')};
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 760px;
    height: 540px;

    margin-top: 38px;
  }
`;

export const RatingTitle = styled.strong`
  font-weight: normal;
  font-size: 22px;
  line-height: 26px;
  font-family: 'SFPro';
  letter-spacing: 0px;
  color: #424242;
`;

export const StarsContainer = styled.div`
  display: flex;
  width: 230px;
  align-items: center;
  justify-content: space-between;

  img {
    width: 37px;
    height: 37px;
  }
`;

export const OrderStatus = styled.div`
  display: flex;
  width: 100%;
  height: 159.5px;
`;

export const StatusIcon = styled.img`
  width: 45px;
  height: 45px;
  margin-top: 10px;
`;

export const OpenTab = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: #ededed;
  margin-left: 15px;

  img {
    width: 30px;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  width: 661px;
  height: 139px;
  /* background-color: #c0a; */
  margin-left: 21px;
  margin-top: 10px;

  h1 {
    font-weight: normal;
    font-size: 22px;
    line-height: 26px;
    font-family: 'SFPro';
    letter-spacing: 0px;
    color: #424242;
  }
`;

export const Separator = styled.div`
  border: 1px solid #e0e0e0;
  height: 0px;
  width: 495px;
  background-color: #e0e0e0;
  margin-top: 16.5px;
  margin-bottom: 14px;
`;

export const OrderInfoContainer = styled.div`
  display: flex;
  width: 689px;
  /* background-color: #ff00e0; */
`;

export const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: 33px;

  strong {
    font-weight: normal;
    font-size: 12px;
    line-height: 19px;
    font-family: 'SFPro';
    letter-spacing: 0px;
    color: #9e9e9e;

    b {
      color: #424242;
    }
  }

  & + div {
    margin-left: 30px;
  }
`;

export const StatusContainer = styled.div`
  display: flex;
  width: 447px;
  height: 28px;
  align-items: center;
  justify-content: space-between;
  /* background-color: #6600e0; */
  margin-top: 10px;

  span {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    height: 50px;
    margin-top: 15px;

    img {
      width: 28px;
      height: 28px;
    }
    small {
      margin-top: 8px;
      font-weight: normal;
      font-size: 12px;
      line-height: 14px;
      font-family: 'SFPro';
      letter-spacing: 0px;
      color: #29b4cc;
    }
  }

  div {
    width: 80px;
    height: 0px;
    border: 1.5px solid #29b4cc;
    margin: 0 10.5px;
  }
`;

export const ShippingInfoSeparator = styled.div`
  border: 1px solid #e0e0e0;
  height: 0px;
  width: 495px;
  background-color: #e0e0e0;
  margin-top: 0px;
  margin-bottom: 21.5px;
  display: ${({ open }) => (open ? 'block' : 'none')};
`;

export const ShippingInfo = styled.div`
  display: ${({ open }) => (open ? 'flex' : 'none')};
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 112px;
  /* background-color: #624; */

  small {
    text-align: left;
    margin-top: 8px;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    font-family: 'SFPro';
    letter-spacing: 0px;
    color: #424242;
    /* background-color: #ff4242; */

    b {
      color: #9e9e9e;
    }

    & + small {
      margin-top: 5px;
    }
  }
`;
