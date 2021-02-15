import styled from 'styled-components'
import { shade } from 'polished'

import theme from '../../styles/theme.json'

export const Container = styled.div`
`

export const Header = styled.header`
  padding: 32px 0;
  background: ${theme.colors.secondary};
`

export const HeaderContent = styled.div`
  display: flex;
  max-width: 1120px;
  margin: 0 auto;
  align-items: center;

  > img {
    width: 170px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;
    color: ${theme.colors.white};
    &:hover { color: ${shade(0.2, theme.colors.white)} }

    > svg {
      width: 20px;
      height: 20px;
    }
  }
`

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  > img, svg {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: ${theme.colors.background};
  }

  > div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;
    > span { color: ${shade(0.2, theme.colors.white)} }
    > strong { color: ${theme.colors.primary} }
  }
`
