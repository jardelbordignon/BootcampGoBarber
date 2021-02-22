import styled, { css } from 'styled-components/native'
import theme from '../../styles/theme.json'

interface IContainer {
  isActive: boolean
  hasError?: boolean
}

export const Container = styled.View<IContainer>`
  width: 100%;
  height: 50px;
  padding: 0 16px;
  background: ${theme.colors.secondary};
  border-radius: 10px;
  margin-bottom: 8px;

  border-width: 2px;
  border-style: solid;
  border-color: ${props =>
    props.hasError
    ? theme.colors.danger
    : props.isActive
    ? theme.colors.primary
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
  hasError?: boolean
}
export const Placeholder = styled.Text<IPlaceholder>`
  position: absolute;
  top: 20%;
  left: 50px;
  font-size: 18px;
  color: ${props => theme.colors[props.hasError ? 'danger' : 'tertiary']};
  z-index: -1;

  ${props => (props.isActive) && css`
    top: -10px;
    left: 30px;
    font-size: 12px;
    color: ${props => theme.colors[props.hasError ? 'danger' : 'primary']};
    background: ${theme.colors.secondary};
    padding: 3px 8px;
    border-radius: 10px;
  `};
`
