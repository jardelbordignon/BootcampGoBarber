import styled from 'styled-components/native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

import theme from '../../../styles/theme.json'

export const Container = styled.View`
  flex: 1;
`

export const Header = styled.View`
  padding: 24px;
  /* padding-top: ${getStatusBarHeight() + 24}px; */
  background: ${theme.colors.blackMedium};

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const BackButton = styled.TouchableOpacity`

`

export const HeaderTitle = styled.Text`
  color: ${theme.colors.white};
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
  margin-left: 16px;
`

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 38px;
`

