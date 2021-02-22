import { RectButton } from 'react-native-gesture-handler'
import styled from 'styled-components/native'

import theme from '../../../styles/theme.json'

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 24px;
`


export const Title = styled.Text`
  font-size:32px;
  color: ${theme.colors.white};
  font-family: 'RobotoSlab-Medium';
  margin-top: 48px;
  text-align: center;
`

export const Description = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 18px;
  color: ${theme.colors.tertiary};
  margin-top: 16px;
  text-align: center;
`

export const OkButton = styled(RectButton)`
  background: ${theme.colors.primary};
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 24px;
  padding: 12px 30px;
`

export const OkButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: ${theme.colors.background};
  font-size: 18px;
`
