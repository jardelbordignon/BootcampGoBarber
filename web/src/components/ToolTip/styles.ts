import styled from 'styled-components'

import theme from '../../styles/theme.json'

export const Container = styled.div`
  position: relative;

  span.title {
    z-index: 3;
    width: 180px;
    background: ${theme.colors.primary};
    color: ${theme.colors.background};
    padding: 8px;
    border-radius: 4px;
    font-size: 1.4rem;
    font-weight: 500;

    transition: visibility 0.4s;
    visibility: hidden;

    position: absolute;
    bottom: calc(100% + 10px);

    // alinhando ao centro
    left: 50%;
    transform: translateX(-50%);

    // flecha inferior
    &::before {
      content: '';
      border-style: solid;
      border-color: ${theme.colors.primary} transparent;
      border-width: 6px 6px 0 6px;
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    visibility: visible;
  }
`
