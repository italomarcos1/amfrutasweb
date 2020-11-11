import styled from 'styled-components';
import { Form } from '@unform/web';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 821px;
  overflow-x: hidden;
`;

export const Content = styled.div`
  width: 821px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 840px;
    height: 455px;
    margin-top: 30px;
  }
`;

export const InfoContainer = styled(Form)`
  width: 683px;
  height: 431px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;

  padding: 21px 29px 36px 27px;
`;

export const SectionTitle = styled.div`
  display: block;
  text-align: left;
  width: 1240px;
  margin: 0 auto;

  strong {
    font-weight: normal;
    font-size: 22px;
    line-height: 29px;
    font-family: 'SFProBold';
    letter-spacing: 0px;
    color: #000;
  }

  small {
    display: block;
    margin-top: 2.5px;
    font-size: 15px;
    line-height: 20px;
    font-family: 'SFPro';
    letter-spacing: 0px;
    color: #0cb68b;
  }
`;

export const Address = styled.div`
  width: 247px;
  height: 203px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;

  padding: 19px 26px 27px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
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

    b {
      text-align: left;
      margin-top: 8px;
      font-weight: normal;
      font-size: 12px;
      line-height: 14px;
      font-family: 'SFPro';
      letter-spacing: 0px;
      color: #9e9e9e;
    }

    & + small {
      margin-top: 5px;
    }
  }

  & + div {
    margin-left: 40px;
  }
`;

export const StartStop = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;

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
