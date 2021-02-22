import React from 'react'
import { RectButtonProperties } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Feather'

import { RectBtn, BtnTxt } from './styles'

interface IButton extends RectButtonProperties {
  children?: string
  loading?: boolean
  icon?: string
}

const Button: React.FC<IButton> = ({ children, icon, loading, ...rest }) => {
  return (
    <RectBtn {...rest} disabled={loading}>
      {!children && <BtnTxt />}

      {icon ? <Icon name={icon} size={20} /> : <BtnTxt />}

      {children && <BtnTxt>{children}</BtnTxt>}

      {loading ? <Icon name="loader" size={20} /> : <BtnTxt />}
    </RectBtn>
  )
}

export default Button
