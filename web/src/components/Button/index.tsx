import { ButtonHTMLAttributes, useState } from 'react'
import { IconBaseProps } from 'react-icons'
import { Container } from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
  icon?: React.ComponentType<IconBaseProps>
}

const Button: React.FC<ButtonProps> = ({ children, loading, icon: Icon, ...rest }) => (
  <Container {...rest} disabled={rest.disabled || loading}>
    {Icon && <Icon size={20} />}

    {loading && (
      <div>
        <div className="loading">
          <div />
          <div />
          <div />
        </div>
      </div>
    )}

    {children}
  </Container>
)

export default Button
