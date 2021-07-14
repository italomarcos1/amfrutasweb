import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 240px;
  margin-top: 20px;
`;

export const Title = styled.small`
  text-align: left;
  font-family: 'SFProBold';
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0px;
  color: #424242;
`;

export const Input = styled.textarea`
  width: 100%;
  height: 87px;
  resize: none;
  margin-top: 5px;
  background-color: #fff;
  border: 1px solid #bec2c8;
  border-radius: 2px;
  padding: 7.5px 10px;
  font-family: 'SFPro';
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0px;
  color: #424242;

  &::placeholder {
    color: #bbbfc6;
    font-style: italic;
  }
`;
