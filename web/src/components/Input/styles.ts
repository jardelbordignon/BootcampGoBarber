import styled, { css } from 'styled-components'
import { shade } from 'polished'

import ToolTip from '../ToolTip'
import theme from '../../styles/theme.json'

interface ContainerProps {
  isFocused: boolean
  isFilled: boolean
  isErrored: boolean
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

  border-color: ${props =>
    props.isFocused
    ? theme.colors.primary
    : props.isErrored
    ? theme.colors.danger
    : 'transparent'
  };

  input {
    color: ${theme.colors.white};
    background: transparent;

    &::placeholder { color: ${shade(0.2, theme.colors.white)}; }
    z-index: 2;
  }

  span.placeholder {
    color: ${shade(0.2, theme.colors.white)};
    display: block;
    position: absolute;

    transition: all 0.3s;
    left: 50px;
    top: 50%;
    transform: translateY(-50%);

    ${props => (props.isFocused || props.isFilled) && css`
      top: 10px;
      left: 35px;
      font-size: 1rem;
    `};
  }
`

export const Error = styled(ToolTip)`
  svg {
    margin: 0;
  }

  // sobrescrevendo as cores do ToolTip
  span.title {
    background: ${theme.colors.danger};
    color: ${theme.colors.white};

    &::before {
      border-color: ${theme.colors.danger} transparent;
    }
  }


`
