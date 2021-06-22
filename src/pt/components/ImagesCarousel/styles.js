import styled from 'styled-components';
import Carousel from 'react-elastic-carousel';

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 30px;
  margin-top: 25px;
  border-radius: 50%;
  background-color: #e7e7e7;

  img {
    width: 16px;
  }
`;

export const Images = styled(Carousel)`
  width: 400px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  padding: 0;
`;

export const Image = styled.button.attrs({
  type: 'button',
})`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  width: 80px;

  img {
    height: 80px;
    width: 80px;
    border-radius: 6px;
  }
`;
