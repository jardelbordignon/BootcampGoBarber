import styled from 'styled-components'
import { shade } from 'polished'

import theme from '../../styles/theme.json'
import bgSignin from '../../assets/bg_signin.png'

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch; // estica o conteúdo para o tamanho do container
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: 700px;

  form {
    margin: 80px 0;
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
