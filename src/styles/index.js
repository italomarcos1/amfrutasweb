import { createGlobalStyle } from 'styled-components';
import SFPro from '../assets/fonts/SanFrancisco.otf';
import SFProSemibold from '../assets/fonts/SanFranciscoSemibold.otf';
import SFProBold from '../assets/fonts/SanFranciscoBold.otf';
import SFProHeavy from '../assets/fonts/SanFraciscoHeavy.otf';
import SFProLight from '../assets/fonts/SanFranciscoLight.otf';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }
    
    *:focus{
        outline: 0;
    }

    html, body, #root{
        height: 100%;
    }

    body {
        -webkit-font-smoothing: antialiased;
    }

    textarea, input[type="text"] {
      -webkit-appearance: none;
    }

    @font-face {
      font-family: "SFPro";
      src: local('SFPro'), url(${SFPro}) format('opentype');
    }

    @font-face {
      font-family: "SFProSemibold";
      src: local('SFProSemibold'), url(${SFProSemibold}) format('opentype');
    }

    @font-face {
      font-family: "SFProBold";
      src: local('SFProBold'), url(${SFProBold}) format('opentype');
    }

    @font-face {
      font-family: "SFProHeavy";
      src: local('SFProHeavy'), url(${SFProHeavy}) format('opentype');
    }

    @font-face {
      font-family: "SFProLight";
      src: local('SFProLight'), url(${SFProLight}) format('opentype');
    }


    body, input, button {
      border:0;
      outline: 0;
      font: 14px 'SFPro', sans-serif;
    }

    body{
      background-color:#f5f5f5;
    }

    a {
        text-decoration: none;
    }

    ul {
        list-style: none;
    }

    button, label {
        cursor: pointer;
    }
`;
