/**
 * no eslint.json -> "jest": true
 */
import { render } from '@testing-library/react'
import SignIn from '../../pages/SignIn'

// mockando o useHistory e Link do react-router-domn
jest.mock('react-router-dom', () => {
  return {
    useHistory: jest.fn(),
    Link: ({ children }: {children: React.ReactNode}) => children
  }
})

describe('SingIn Page', () => {
  it('should be able to sign in', () => {
    const { debug } = render(<SignIn />)

    debug()
  })
})
