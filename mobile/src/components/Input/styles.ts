import styled, { css } from 'styled-components/native'

import theme from '../../styles/theme.json'

export const Container = styled.View`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: ${theme.colors.secondary};
  border-radius: 10px;
  margin-bottom: 8px;
`

export const TextInput = styled.TextInput`
  flex: 1;
  color: ${theme.colors.white};
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  margin-top: 5px;
`

export const Placeholder = styled.Text`
  position: absolute;
  top: 30%;
  left: 50px;
  font-size: 20px;
  color: ${theme.colors.tertiary};

  top: 6px;
  left: 35px;
  font-size: 12px;
`
