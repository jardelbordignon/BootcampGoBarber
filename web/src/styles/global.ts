import { createGlobalStyle } from 'styled-components'

import theme from './theme.json'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html {
    /* font-size default é 16px,  16px * 62.5% = 10px,  10px = 1rem */
    font-size: 62.5%;
  }

  body {
    background: ${theme.colors.background};
    color: ${theme.colors.white};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body, input, button {
    font-family: 'Roboto Slab', sans-serif;
    font-size: 1.6rem;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  input {
    border: 2px solid transparent;
    border-radius: 10px;
    padding: 16px;
    width: 100%;
  }

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    transition: all 0.2s;
  }

  button {
    border: 0;
    border-radius: 10px;
    padding: 16px;
    width: 100%;
    transition: all 0.2s;
    cursor: pointer;
  }
`
