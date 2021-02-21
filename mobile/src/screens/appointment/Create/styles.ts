import styled from 'styled-components/native'
import { FlatList } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { RectButton } from 'react-native-gesture-handler'

import theme from '../../../styles/theme.json'
import { IProvider } from './index'

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

interface IAvatar {
  size?: number;
}
export const Avatar = styled.Image<IAvatar>`
  width: ${props => props.size || 56}px;
  height: ${props => props.size || 56}px;
  border-radius: ${props => props.size ? props.size/2 : 28}px;
`

export const Content = styled.ScrollView``

export const ProvidersListContainer = styled.View`
  height: 112px;
`

export const ProvidersList = styled(FlatList as new () => FlatList<IProvider>)`
  padding: 32px 24px;
`

interface IProviderContainer {
  selected: boolean
}
export const ProviderContainer = styled(RectButton)<IProviderContainer>`
  background: ${props => theme.colors[props.selected ? 'primary' : 'blackLight']};
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  margin-right: 16px;
  border-radius: 10px;
`

interface IProviderName {
  selected: boolean
}
export const ProviderName = styled.Text<IProviderName>`
  margin-left: 8px;
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  color: ${props => theme.colors[props.selected ? 'secondary' : 'white']};
`

export const Calendar = styled.View``

export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 24px;
  margin: 0 24px 24px;
  color: ${theme.colors.white};
`

export const OpenDatePickerButton = styled(RectButton)`
  background: ${theme.colors.primary};
  height: 46px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 24px;
`

export const OpenDatePickerButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  color: ${theme.colors.background};
`

export const Schedule = styled.View`
  padding: 24px 0 16px;
`

export const Section = styled.View`
  margin-bottom: 24px;
`

export const SectionTitle = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 18px;
  color: ${theme.colors.white};
  margin: 20px 24px;
`

export const SectionContent = styled.ScrollView.attrs({
  contentContainerStyle: { paddingHorizontal: 24 },
  horizontal: true,
  showsHorizontalScrollIndicator: false
})``

interface IHour {
  available: boolean
  selected: boolean
}
export const Hour = styled(RectButton)<IHour>`
  padding: 12px;
  background: ${props => props.selected ? theme.colors.primary : theme.colors.secondary};
  border-radius: 10px;
  margin-right: 8px;
  opacity: ${props => props.available ? 1 : 0.3};
`

interface IHourText {
  selected: boolean
}
export const HourText = styled.Text<IHourText>`
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
  color: ${props => props.selected ? theme.colors.secondary : theme.colors.white};
`


export const CreateAppointmentButton = styled(RectButton)`
  background: ${theme.colors.primary};
  height: 50px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 24px 30px;
`

export const CreateAppointmentButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: ${theme.colors.secondary};
`
