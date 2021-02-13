import styled from 'styled-components'
import { shade } from 'polished'

import theme from '../../styles/theme.json'

export const Container = styled.button`
  background: ${theme.colors.primary};
  color: ${theme.colors.background};
  margin-top: 16px;
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  &:hover {
    background: ${shade(0.2, theme.colors.primary)};
  }
`
