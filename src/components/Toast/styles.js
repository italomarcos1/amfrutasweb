import styled, { keyframes } from 'styled-components';
import { lighten, darken } from 'polished';

export const Container = styled.div`
  width: 20%;
  height: 10%;
  position: fixed;
  background-color: transparent;
  /* background-color: #6633cc; */
  z-index: 1100;
  bottom: 0px;
  display: flex;
  margin: 0 auto;
  left: 40%;
  bottom: 20%;
  justify-content: center;
`;

const popIn = keyframes`
  from {
    opacity:0;
    width: 57px;
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
  background-color: ${({ color }) => lighten('0.2', color)};
  border: 2.5px solid ${({ color }) => darken('0.2', color)};
  color: ${({ color }) => darken('0.15', color)};
  font-size: 16px;
  height: 57px;
  font-family: 'SFPro';
  border-radius: 6px;
  padding: 5px 30px;
  text-align: center;

  animation: ${({ visible }) => (visible ? popIn : popOut)} 0.25s linear normal;
`;
