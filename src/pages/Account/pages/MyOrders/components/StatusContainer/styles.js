import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 467px;
  height: 50px;
  align-items: flex-start;
  justify-content: space-between;
  /* background-color: #6600e0; */
  margin-top: 10px;
`;

export const BadgeContainer = styled.div`
  display: flex;
  width: 447px;
  height: 28px;
  align-items: center;
  justify-content: space-between;
`;

export const BadgeTitleContainer = styled.div`
  display: flex;
  width: 447px;
  height: 14px;
  align-items: center;
  justify-content: flex-start;
`;

export const Badge = styled.span`
  display: flex;
  align-items: center;
  text-align: center;
  height: 28px;
  /* margin-top: 15px; */
  //
  img {
    width: 28px;
    height: 28px;
  }
`;

export const BadgeTitle = styled.small`
  display: block;
  margin-top: 8px;
  margin-left: 101px;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  font-family: 'SFPro';
  letter-spacing: 0px;
  color: #e0e0e0;
  color: ${({ active }) => (active ? '#29b4cc' : '#e0e0e0')};
`;

export const Separator = styled.div`
  width: 80px;
  height: 0px;
  border: 1.5px solid #e0e0e0;
  border-color: ${({ active }) => (active ? '#29b4cc' : '#e0e0e0')};
  margin: 0 10.5px;
`;
