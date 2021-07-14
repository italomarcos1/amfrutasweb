import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #0cb68b;

  strong {
    margin-top: 12px;
    font-size: 22px;
    line-height: 33px;
    font-weight: bold;
    font-family: 'SFProBold';
    color: #fff;
  }
`;

export const StoreButtonContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  height: 110px;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
`;

export const StoreButton = styled.a`
  width: 164px;
  height: 50px;
  border-radius: 5px;
`;
