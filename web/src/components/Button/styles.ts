import styled from 'styled-components'
import { shade } from 'polished'

import theme from '../../styles/theme.json'

export const Container = styled.button`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  margin-top: 16px;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  position: relative;

  > svg {
    position: absolute;
    left: 18px;
  }

  > div {
    position: absolute;
    top: 0;
    right: 50px;

    > div.loading {
      display: inline-block;
      position: relative;

      > div {
        display: inline-block;
        position: absolute;
        right: 0;
        width: 10px;
        background: ${theme.colors.background};
        animation: loading 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
      }

      > div:nth-child(1) {
        left: 0;
        animation-delay: -0.24s;
      }
      > div:nth-child(2) {
        left: 15px;
        animation-delay: -0.12s;
      }
      > div:nth-child(3) {
        left: 30px;
        animation-delay: 0;
      }
      @keyframes loading {
        0% {
          top: -15px;
          height: 50px;
        }
        50%, 100% {
          top: 0;
          height: 20px;
        }
      }

    }
  }

  &:hover {
    background: ${shade(0.2, theme.colors.primary)};
  }
`
