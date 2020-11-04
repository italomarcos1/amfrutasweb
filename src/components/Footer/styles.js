import styled from 'styled-components';

export const TopFooter = styled.div`
  width: 100%;
  height: 212px;
  background-color: #f8f9fb;
  padding: 25px 0;
  display: flex;
  flex-direction: column;

  img {
    width: 233px;
    height: 52px;
    margin: 0 auto;
  }
`;

export const ItemsContainer = styled.div`
  display: flex;
  width: 741px;
  height: 81px;
  margin: 28px auto 0;
`;

export const Item = styled.div`
  padding-left: 7px;
  height: 81px;

  border-left: 8px solid #0cb68b;

  & + div {
    margin-left: 80px;
  }

  span {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    height: 72px;
    font-family: 'SFPro';
    font-size: 15px;
    line-height: 26px;
    letter-spacing: 0px;
    color: #000000;

    p {
      font-family: 'SFPro';
    }
  }
`;

export const BottomFooter = styled.div`
  width: 100%;
  height: 65px;
  background-color: #0cb68b;
  padding: 0 212px 0 237px;

  text-align: center;
  letter-spacing: 0px;
  color: #fff;

  img {
    width: 32px;
    height: 32px;
  }
`;

export const BottomFooterContent = styled.div`
  width: 850px;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;

  small {
    font-family: 'SFPro';
    font-size: 15px;
    line-height: 22px;
    letter-spacing: 0px;
  }

  b {
    font-family: 'SFProSemibold';
  }
`;
