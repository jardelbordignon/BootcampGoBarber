import styled from 'styled-components'
import { shade } from 'polished'

import theme from '../../styles/theme.json'

export const Container = styled.div`
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
    color: ${shade(0.2, theme.colors.white)};
  }

  input {
    color: ${theme.colors.white};
    background: transparent;

    &::placeholder { color: ${shade(0.2, theme.colors.white)}; }
  }

  span {
    color: ${shade(0.2, theme.colors.white)};
    display: block;
    position: absolute;

    //left: 50px;

    top: 4px;
    left: 35px;
    font-size: 1rem;
  }


`
