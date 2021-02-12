import styled, { css } from 'styled-components'
import { shade } from 'polished'

import theme from '../../styles/theme.json'

interface ContainerProps {
  isFocused: boolean
  isFilled: boolean
}

export const Container = styled.div<ContainerProps>`
  background: ${theme.colors.secondary};

  border: 2px solid transparent;
  border-radius: 10px;
  padding: 0 16px;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;

  & + div {
    margin-top: 8px;
  }

  svg {
    color: ${props => props.isFocused || props.isFilled
      ? theme.colors.primary
      : shade(0.2, theme.colors.white)
    };
  }

  ${props => props.isFocused && css`
    border-color: ${theme.colors.primary};
  `};

  input {
    color: ${theme.colors.white};
    background: transparent;

    &::placeholder { color: ${shade(0.2, theme.colors.white)}; }
  }

  span {
    color: ${shade(0.2, theme.colors.white)};
    display: block;
    position: absolute;

    transition: all 0.2s;
    left: 50px;

    ${props => (props.isFocused || props.isFilled) && css`
      top: 4px;
      left: 35px;
      font-size: 1rem;
    `};
  }


`
