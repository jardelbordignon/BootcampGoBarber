import styled, { keyframes } from 'styled-components'
import { shade } from 'polished'

import theme from '../../../styles/theme.json'
import bgSignin from '../../../assets/bg_signin.png'

const appearFromLeft = keyframes`
  from { transform: translate(50px, -50px); }
  to { transform: translate(0, 0); }
`
const appearWithFade = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

export const Container = styled.div`
  animation: ${appearWithFade} 1.5s;
  height: 100vh;

  display: flex;
  align-items: stretch; // estica o conteúdo para o tamanho do container
`

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: 700px;
`

export const AnimatedContainer = styled.div`
  animation: ${appearFromLeft} 1s;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  form {
    margin: 40px 0;
    width: 100%;
    max-width: 320px;
    text-align: center;

    h1 {
      margin: 24px;
    }

    a {
      color: ${theme.colors.white};
      margin-top: 24px;

      &:hover {
        color: ${shade(0.2, theme.colors.white)}
      }
    }
  }

  > a {
    color: ${theme.colors.primary};
    > svg {
      margin-right: 10px;
    }

    &:hover {
      color: ${shade(0.2, theme.colors.primary)}
    }
  }
`

export const Background = styled.div`
  flex: 1;
  background: url(${bgSignin}) no-repeat center;
  background-size: cover; // imagem em todo o tamanho
`
