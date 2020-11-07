import styled from 'styled-components';

export const DeliveryAndCardsContainer = styled.div`
  height: 229px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const InfoContainer = styled.div`
  width: 841px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & + div {
    margin-top: 18px;
  }
`;
