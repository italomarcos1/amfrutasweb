import { createGlobalStyle } from 'styled-components';
import SFPro from '../assets/fonts/SanFrancisco.otf';
import SFProBold from '../assets/fonts/SanFranciscoBold.otf';
import SFProCustom from '../assets/fonts/SFPrice.otf';
import SFProBoldCustom from '../assets/fonts/SFBoldPrice.otf';

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
        -moz-font-smoothing: antialiased !important;
        -webkit-font-smoothing: antialiased !important;
        /* text-rendering: optimizeLegibility; */
    }

    textarea, input[type="text"] {
      -webkit-appearance: none;
    }

    @font-face {
      font-family: "SFPro";
      src: local('SFPro'), url(${SFPro}) format('opentype');
    }

    @font-face {
      font-family: "SFProBold";
      src: local('SFProBold'), url(${SFProBold}) format('opentype');
      font-weight: bold;
    }

    @font-face {
      font-family: "SFProCustom";
      src: local('SFProCustom'), url(${SFProCustom}) format('opentype');
    }

    @font-face {
      font-family: "SFProCustomBold";
      src: local('SFProCustomBold'), url(${SFProBoldCustom}) format('opentype');
      font-weight: bold;
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
