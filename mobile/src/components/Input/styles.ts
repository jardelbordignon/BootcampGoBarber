import styled, { css } from 'styled-components/native'

import theme from '../../styles/theme.json'

export const Container = styled.View`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: ${theme.colors.secondary};
  border-radius: 10px;
  margin-bottom: 8px;

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

export const Placeholder = styled.Text`
  position: absolute;
  top: 30%;
  left: 50px;
  font-size: 18px;
  color: ${theme.colors.tertiary};

  top: 5px;
  left: 45px;
  font-size: 12px;
`
