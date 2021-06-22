import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 467px;
  height: 50px;
  align-items: flex-start;
  justify-content: space-between;
  /* background-color: #6600e0; */
  margin-top: 0px;
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
  width: 487px;

  height: 14px;
  align-items: center;
  justify-content: flex-start;
  margin-top: 8px;
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
  font-weight: normal;
  font-size: 12px;
  width: ${({ width }) => `${width}px`};
  /* margin-left: ${({ margin }) => `${margin}px`}; */
  line-height: 14px;
  font-family: 'SFPro';
  letter-spacing: 0px;
  color: #e0e0e0;
  color: ${({ active, wasCancelled }) =>
    wasCancelled ? '#F64847' : active ? '#29b4cc' : '#e0e0e0'};
`;

export const Separator = styled.div`
  width: 80px;
  height: 0px;
  border: 1.5px solid #e0e0e0;
  border-color: ${({ active }) => (active ? '#29b4cc' : '#e0e0e0')};
  margin: 0 10.5px;
`;
