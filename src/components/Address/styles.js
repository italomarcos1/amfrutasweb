import styled from 'styled-components';

export const Container = styled.div`
  width: 247px;
  height: 203px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;

  padding: 19px 26px 27px;
  padding-right: 13px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  /* background-color: #624; */
  position: relative;

  small {
    display: block;
    text-align: left;
    margin-top: 8px;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    font-family: 'SFPro';
    letter-spacing: 0px;
    color: #424242;

    b {
      text-align: left;
      margin-top: 8px;
      font-weight: normal;
      font-size: 12px;
      line-height: 14px;
      font-family: 'SFPro';
      letter-spacing: 0px;
      color: #9e9e9e;
    }

    & + small {
      margin-top: 5px;
    }
  }

  & + div {
    margin-left: 40px;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  button {
    background: none;

    img {
      height: 21px;
    }
  }
`;

export const StartStop = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    background-color: #fff;
    border: 3px solid #0cb68b;
    border-color: ${({ selected }) => (selected ? '#0cb68b' : '#ccc')};
    border-radius: 50%;
    margin-left: 0;
    padding: 2px;
    text-align: center;

    img {
      display: ${({ selected }) => (selected ? 'block' : 'none')};
      width: 15px;
      height: 15px;
    }
  }

  strong {
    font-size: 15px;
    line-height: 22px;
    font-weight: normal;
    font-family: 'SFPro';
    color: #393939;
    margin-left: 12px;
  }
`;

export const Options = styled.div`
  display: flex;
  flex-direction: column;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  position: absolute;
  width: 140px;
  height: 64px;
  z-index: ${({ visible }) => (visible ? 1099 : -999)};
  color: #a3a3a3;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  transition: opacity 0.05s;
  align-self: center;
  margin-top: 2px;
  right: 18px;
  top: 42px;

  button {
    font-family: 'SFPro';
    font-size: 13px;
    line-height: 16px;
    background-color: #fff;
    border: none;
    text-align: left;
    width: 138px;
    padding-left: 8px;
    height: 32px;
    border-radius: 4px;
    color: #9e9e9e;
    transition: all 0.1s;

    &:hover {
      &.edit {
        background-color: #0cb68b;
        color: #fff;
      }
      &.delete {
        background-color: #f53030;
        color: #fff;
      }
    }

    & + button {
      border-top: 1px solid #bec2c8;
    }
  }
`;
