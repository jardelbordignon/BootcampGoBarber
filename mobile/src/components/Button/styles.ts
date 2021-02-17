import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'

import theme from '../../styles/theme.json'

export const RectBtn = styled(RectButton) `
  height: 60px;
  background: ${theme.colors.primary};
  border-radius: 10px;
  margin-top: 8px;

  justify-content: center;
  align-items: center;
`

export const BtnTxt = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: ${theme.colors.background};
  font-size: 18px;
`
