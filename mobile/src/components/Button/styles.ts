import styled from 'styled-components/native'
import { Dimensions } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

const height = Dimensions.get('window').height

import theme from '../../styles/theme.json'

export const RectBtn = styled(RectButton) `
  height: ${height/13}px;
  background: ${theme.colors.primary};
  border-radius: 10px;
  margin-top: ${height/85}px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
`

export const BtnTxt = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: ${theme.colors.background};
  font-size: 18px;
  min-width: 20px;
`
