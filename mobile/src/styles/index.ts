import styled from 'styled-components/native'
// to end the error, just add in tsconfig.json -> "noImplicitAny": false

import theme from './theme.json'

// https://reactnative.dev/docs/flexbox
// https://reactnative.dev/docs/layout-props#position
interface IBox {
  background?: 'primary'|'secondary'|'background'|'white'|'danger'
  row?: boolean
  justify?: 'flex-start'|'flex-end'|'space-between'|'space-around'|'space-evenly'
  align?: 'stretch'|'flex-start'|'flex-end'|'baseline'
  padding?: number
  width?: string
  height?: string
  absolute?: boolean
  top?: number
  zIndex?: number
}

export const Box = styled.View<IBox> `
  flex: 1;
  background-color: ${props => props.background ? theme.colors[props.background] : 'transparent'};
  flex-direction: ${props => props.row ? 'row' : 'column'};
  justify-content: ${props => props.justify || 'center'};
  align-items: ${props => props.align || 'center'};
  padding: ${props => props.padding || 0}px;
  width: 100%;
  max-width: ${props => props.width || '100%'};
  max-height: ${props => props.height ? props.height : 'auto'};
  position: ${props => props.absolute ? 'absolute' : 'relative'};
  top: ${props => props.top || 0}px;
  z-index: ${props => props.zIndex || 1};
`
