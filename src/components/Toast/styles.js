import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 22.5%;
  position: fixed;
  background-color: transparent;
  z-index: 1100;
  bottom: 0px;
  display: flex;
  justify-content: center;
`;

const popIn = keyframes`
  from {
    opacity:0;
    width:0px;
    height: 11px;

    #click{
      display:none;
    }
  }

  to {
    opacity:1;
    height: 57px;

    #click{
      display:block;
    }
  }
`;

const popOut = keyframes`
  from {
    opacity:1;
    height: 57px;

    #click{
      display:none;
    }
  }

  to {
    opacity:0;
    height: 0px;

    #click{
      display:block;
    }
  }
`;

export const Toast = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #a8dd8e;
  border: 2.5px solid #498a29;
  color: #335f1d;
  font-size: 16px;
  height: 57px;
  font-family: 'SFPro';
  border-radius: 6px;
  padding: 5px 30px;

  animation: ${({ visible }) => (visible ? popIn : popOut)} 0.3s linear normal;
`;
