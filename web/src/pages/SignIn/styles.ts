import styled from 'styled-components'
import { shade } from 'polished'

import theme from '../../styles/theme.json'
import backgroundPng from '../../assets/background.png'

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
    max-width: 340px;
    text-align: center;

    h1 {
      margin: 24px;
    }

    input {
      background: ${theme.colors.secondary};
      color: ${theme.colors.white};

      //&::placeholder { color: ${theme.colors.primary}; }

      & + input {
        margin-top: 8px;
      }
    }

    button {
      background: ${theme.colors.primary};
      color: ${theme.colors.background};
      margin-top: 16px;

      &:hover {
        background: ${shade(0.2, theme.colors.primary)};
      }
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
  }

`

export const Background = styled.div`
  flex: 1;
  background: url(${backgroundPng}) no-repeat center;
  background-size: cover; // imagem em todo o tamanho
`
