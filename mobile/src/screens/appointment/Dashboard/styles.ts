import styled from 'styled-components/native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { FlatList } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import { IProvider } from './index'
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

export const HeaderTitle = styled.Text`
  color: ${theme.colors.white};
  font-size: 20px;
  font-family: 'RobotoSlab-Regular';
  line-height: 28px;
`

export const UserName = styled.Text`
  color: ${theme.colors.primary};
  font-family: 'RobotoSlab-Regular';
`

export const ProfileButton = styled.TouchableOpacity``

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 56px;
`

export const ProvidersList = styled(FlatList as new () => FlatList<IProvider>)`
  padding: 32px 24px 16px;
`

export const ProvidersListTitle = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: ${theme.colors.white};
  font-size: 24px;
  margin-bottom: 24px;
`

export const ProviderContainer = styled(RectButton)`
  background: ${theme.colors.blackLight};
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
`

export const ProviderAvatar = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 36px;
`

export const ProviderInfo = styled.View`
  flex: 1;
  margin-left: 20px;
`

export const ProviderName = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: ${theme.colors.white};
`

export const ProviderMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 6px;
`

export const ProviderMetaText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  margin-left: 8px;
  color: ${theme.colors.tertiary};
`


