import styled, { css } from 'styled-components/native'

import theme from '../../styles/theme.json'

interface IContainer {
  isActive: boolean
  isErrored?: boolean
}

export const Container = styled.View<IContainer>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: ${theme.colors.secondary};
  border-radius: 10px;
  margin-bottom: 8px;

  border-width: 2px;
  border-style: solid;
  border-color: ${props =>
    props.isActive
    ? theme.colors.primary
    : props.isErrored
    ? theme.colors.danger
    : theme.colors.secondary
  };

  flex-direction: row;
  align-items: center;
`

export const TextInput = styled.TextInput`
  flex: 1;
  color: ${theme.colors.white};
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  margin: 5px 0 0 5px;
`

interface IPlaceholder {
  isActive: boolean
}
export const Placeholder = styled.Text<IPlaceholder>`
  position: absolute;
  top: 30%;
  left: 50px;
  font-size: 18px;
  color: ${theme.colors.tertiary};

  ${props => (props.isActive) && css`
    top: 3px;
    left: 40px;
    font-size: 12px;
  `};
`
