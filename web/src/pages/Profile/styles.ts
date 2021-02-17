import styled, { keyframes } from 'styled-components'
import { shade } from 'polished'

import theme from '../../styles/theme.json'

const appearFromRight = keyframes`
  from { transform: translateY(-50px); }
  to { transform: translateY(0); }
`
const appearWithFade = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

export const Container = styled.div`
  animation: ${appearWithFade} 1.5s;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: stretch; // estica o conteúdo para o tamanho do container
`

export const Header = styled.div`
  background: ${theme.colors.secondary};
  display: flex;
  height: 144px;
`

export const HeaderContent = styled.div`
  display: flex;
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  align-items: center;

  > a {
    font-size: 24px;
    color: ${shade(0.2, theme.colors.white)};
    &:hover { color: ${theme.colors.primary}; }
  }
`

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
`

export const AnimatedContainer = styled.div`
  animation: ${appearFromRight} 1s;
  position: relative;

  width: 100%;
  max-width: 340px;


  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    margin-top: 90px;
    width: 100%;
    text-align: center;

    h2 {
      margin: 24px 0;
      text-align: left;
    }

    a {
      color: ${theme.colors.white};
      margin-top: 24px;

      &:hover {
        color: ${shade(0.2, theme.colors.white)};
      }
    }
  }
`

export const AvatarInput = styled.div`
  position: absolute;
  top: -90px;

  > img, > svg {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background-color: ${theme.colors.background};
  }

  label {
    position: absolute;
    bottom: 10px;
    right: -10px;
    border-radius: 50%;
    background-color: ${theme.colors.primary};
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    > input {
      display: none;
    }
    > svg {
      font-size: 20px;
    }

    &:hover {
      background: ${shade(0.2, theme.colors.primary)};
    }
  }

`
