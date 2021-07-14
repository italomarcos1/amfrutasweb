import styled from 'styled-components';

export default styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  border-radius: 4px;
  position: relative;
  background-image: ${({ image }) => `url(${image})`};
  background-repeat: no-repeat;
  background-size: 70px 70px;

  & + div {
    margin-left: 30px;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    background-color: #fff;
    border-width: 3px;
    border-style: solid;
    border-color: ${({ selected }) => (selected ? '#0cb68b' : '#F84C4C')};
    border-radius: 50%;
    margin: 0;
    padding: 1px;

    img {
      margin: 0;
      padding: 0;
      width: ${({ selected }) => (selected ? 16 : 28)}px;
      height: ${({ selected }) => (selected ? 16 : 28)}px;
    }
  }

  & + li {
    margin-left: 30px;
  }
`;
