import styled from 'styled-components';

export const Container = styled.div`
  margin-left: 20px;
  input {
    width: 180px;
    height: 50px;
    background: #f8f9fb;
    border: 1px solid #abacae;
    border-radius: 2px;
    border-color: ${({ error }) => (error ? '#f53030' : '#abacae')};
    border-width: ${({ error }) => (error ? 2 : 1)}px;

    padding: 14px 19px;
    text-align: left;
    color: #666;
    font-style: normal;

    &::placeholder {
      text-align: left;
      font-style: normal;
      font-size: 15px;
      font-family: 'SFPro';
      line-height: 18px;
      letter-spacing: 0px;
      color: #abacae;
      opacity: 1;
    }
  }
`;
