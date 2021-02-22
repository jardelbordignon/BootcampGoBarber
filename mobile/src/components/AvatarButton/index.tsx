import React from 'react'
import { TouchableOpacityProps } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import { RectBtn, BtnTxt } from './styles'

interface IAvatarButton extends TouchableOpacityProps {
  children: string
  loading?: boolean
  icon?: string
}

const AvatarButton: React.FC<IAvatarButton> = ({ children, icon, loading, ...rest }) => {
  return (
    <RectBtn {...rest} disabled={loading}>
      {icon ? <Icon name={icon} size={20} /> : <BtnTxt />}
      <BtnTxt>{children}</BtnTxt>
      {loading ? <Icon name="loader" size={20} /> : <BtnTxt />}
    </RectBtn>
  )
}

export default AvatarButton
