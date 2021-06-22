import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 70px;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 0px;
  /* padding: 20px 12.5px 0; */
  /* padding-right: 16.5px; */
  padding: 10px;
  /* background-color: #390; */
`;

export const BadgeContainer = styled.div`
  display: flex;
  width: 100%;
  height: 28px;
  align-items: center;
  justify-content: flex-start;
`;

export const BadgeTitleContainer = styled.div`
  display: flex;
  width: 100%;

  height: 14px;
  align-items: center;
  justify-content: flex-start;
  margin-top: 8px;
`;

export const Badge = styled.button.attrs({ type: 'button' })`
  display: flex;
  align-items: center;
  text-align: center;
  height: 28px;
  background: none;
  /* margin-top: 15px; */
  //
  img {
    width: 28px;
    height: 28px;
  }

  &[disabled] {
    cursor: disabled;
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
  /* background-color: #af0fe0; */
  color: ${({ active, wasCancelled }) =>
    wasCancelled ? '#F64847' : active ? '#29b4cc' : '#e0e0e0'};
`;

export const Separator = styled.div`
  width: 35px;
  height: 0px;
  border: 1.5px solid #e0e0e0;
  border-color: ${({ active }) => (active ? '#29b4cc' : '#e0e0e0')};
  margin: 0 6.5px;
`;
