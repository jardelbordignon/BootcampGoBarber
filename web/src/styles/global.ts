import styled, { createGlobalStyle } from 'styled-components'

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

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    transition: all 0.2s;
  }

  button {
    border: 0;
    transition: all 0.2s;
    cursor: pointer;
  }
`

interface DivPros {
  flex?: number;
  align?: string // 'top' | 'bottom' | 'right' | 'left' | 'center'
  justify?: string
  column?: boolean
  width?: string
  height?: string
  padding?: string
  margin?: string
  position?: string
  top?: number
  zIndex?: number

  background?: 'primary' | 'secondary' | 'background' | 'white' | 'danger'
}

export const Div = styled.div<DivPros>`
  display: flex;
  align-items: ${props => props.align || 'center'};
  justify-content: ${props => props.justify || 'center'};
  flex-direction: ${props => props.column ? 'column' : 'row'};

  max-width: 100%;
  width: ${props => props.width || '100%'};
  max-height: 100%;
  height: ${props => props.height ? props.height : 'auto'};
  padding: ${props => props.padding || '0'};
  margin: ${props => props.margin || 'auto'};
  position: ${props => props.position || 'relative'};
  top: ${props => props.top || 0}px;
  z-index: ${props => props.zIndex || 1};

  background-color: ${props => props.background ? theme.colors[props.background] : 'transparent'};
`
