import styled from 'styled-components';

export const Container = styled.div`
  width: 221px;
  height: 53px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Input = styled.input`
  width: 100%;
  height: 32px;
  padding: 7px;
  padding-left: 8px;
  text-align: left;
  color: #424242;
  border: 1px solid #bec2c8;
  border-color: ${({ active, error }) =>
    error ? '#f53030' : active ? '#2CA01C' : '#BEC2C8'};
  border-width: ${({ active, error }) => (error || active ? 2 : 1)}px;
  padding: ${({ active }) => (active ? 6 : 7)}px;

  border-radius: 2px;
  font-size: 12px;
  background: #fff;

  &::placeholder {
    text-align: left;
    font-style: italic;
    font-size: 12px;
    font-family: 'Roboto';
    line-height: 16px;
    letter-spacing: 0px;
    color: #bbbfc6;
    opacity: 1;
    text-transform: capitalize;
  }
`;

export const Title = styled.small`
  text-align: left;
  font-weight: bold;

  text-align: left;
  font: normal normal bold 12px/16px 'Roboto';
  letter-spacing: 0px;
  color: #424242;
  margin-bottom: 5px;
  height: 16px;
`;

export const VerifiedEmail = styled.span`
  font: normal 12px/16px 'Roboto';
  letter-spacing: 0px;
  margin-left: 5px;
  margin-top: -1px;
  color: ${({ verified }) => (verified ? '#2ca01c' : '#f53030')};
`;
