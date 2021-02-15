import { ButtonHTMLAttributes, useState } from 'react'

import { Container } from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
}

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Container {...rest} disabled={rest.disabled || loading}>
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
