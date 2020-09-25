import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *, *::after, *::before{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    body{
        width: 100%;
        overflow-x: hidden;
    }
`;

export default GlobalStyle;
