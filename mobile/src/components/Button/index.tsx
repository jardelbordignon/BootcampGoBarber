import React from 'react'
import { RectButtonProperties } from 'react-native-gesture-handler'

import { RectBtn, BtnTxt } from './styles'

interface IButton extends RectButtonProperties {
  children: string
}

const Button: React.FC<IButton> = ({ children, ...rest }) => {
  return (
    <RectBtn {...rest}>
      <BtnTxt>{children}</BtnTxt>
    </RectBtn>
  )
}

export default Button
