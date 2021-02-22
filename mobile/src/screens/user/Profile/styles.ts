import styled from 'styled-components/native'
import { Platform } from 'react-native'
import theme from '../../../styles/theme.json'

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 60px 30px ${Platform.OS === 'android' ? 150 : 40}px;
`

export const Title = styled.Text`
  font-size: 20px;
  color: ${theme.colors.white};
  font-family: 'RobotoSlab-Medium';
  margin: 40px 0 24px;
`

export const UserAvatarButton = styled.TouchableOpacity``

export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 98px;
  margin-top: 64px;
  align-self: center;
`

export const ImageFromSelector = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index:2;
  background-color: ${theme.colors.secondary};
  padding: 24px;
  justify-content: center;
`

export const ButtonClose = styled.TouchableOpacity`
  margin-left: auto;
`

export const TitleAvatarFrom = styled(Title)`
  margin: 5px;
  text-align: center;
`

export const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
`
