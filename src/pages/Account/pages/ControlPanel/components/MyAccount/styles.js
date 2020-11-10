import styled from 'styled-components';

export const Container = styled.button.attrs({
  type: 'button',
})`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
  width: 840px;
  height: 190px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;

  padding: 21px 30px;

  img {
    margin-right: 24px;
  }

  button {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background: none;
    margin-left: 10px;
    width: 9px;
    height: 51px;
  }

  strong {
    font-weight: normal;
    font-size: 22px;
    line-height: 29px;
    font-family: 'SFPro';
    letter-spacing: 0px;
    color: #424242;
  }

  small {
    display: block;
    font-size: 15px;
    line-height: 20px;
    font-family: 'SFPro';
    letter-spacing: 0px;
    color: #9e9e9e;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: flex-start;
  width: 775px;
  justify-content: space-between;
`;

export const IconAndDataContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: 51px;
  width: 253px;
`;

export const UserInfoContainer = styled.div`
  display: flex;
  height: 34px;
  align-items: center;
  justify-content: space-between;
  width: 610px;
  margin-left: 77px;
  margin-top: 19px;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;

  strong {
    font-weight: normal;
    font-size: 11px;
    line-height: 19px;
    font-family: 'SFPro';
    letter-spacing: 0px;
    color: #9e9e9e;
    text-transform: uppercase;
  }

  small {
    font-weight: bold;
    font-size: 12px;
    line-height: 19px;
    font-family: 'SFProBold';
    letter-spacing: 0px;
    color: #424242;
  }
`;
