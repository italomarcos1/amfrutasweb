import styled from 'styled-components';

export const DeliveryAndCardsContainer = styled.div`
  width: ${({ isDesktop }) => (isDesktop ? '410px' : '100%')};
  display: flex;
  height: 229px;
  flex-direction: column;
  justify-content: space-between;
`;

export const InfoContainer = styled.div`
  width: ${({ isDesktop }) => (isDesktop ? '841px' : '100%')};
  display: flex;
  flex-direction: ${({ isDesktop }) => (isDesktop ? 'row' : 'column')};
  align-items: center;
  justify-content: space-between;

  & + div {
    margin-top: 18px;
  }
`;
