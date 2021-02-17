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
  padding?: string
  paddingV?: string
  paddingH?: string
  margin?: string
  marginV?: string
  marginH?: string
  width?: string
  height?: string
  absolute?: boolean
  top?: number
  zIndex?: number
}

export const Box = styled.View<IBox>`
  flex: 1;
  background-color: ${props => props.background ? theme.colors[props.background] : 'transparent'};
  flex-direction: ${props => props.row ? 'row' : 'column'};
  justify-content: ${props => props.justify || 'center'};
  align-items: ${props => props.align || 'center'};
  padding: ${props => props.padding ? `${props.padding}px` :
    props.paddingV ? `${props.paddingV}px 0` : props.paddingH ? `0 ${props.paddingH}px` : 0};
  margin: ${props => props.margin ? `${props.margin}px`:
    props.marginV ? `${props.marginV}px 0` : props.marginH ? `0 ${props.marginH}px` : 0};
  width: 100%;
  max-width: ${props => props.width || '100%'};
  max-height: ${props => props.height ? props.height : 'auto'};
  position: ${props => props.absolute ? 'absolute' : 'relative'};
  top: ${props => props.top || 0}px;
  z-index: ${props => props.zIndex || 1};
`
interface ITitle {
  color: string;
  size: number;
}
export const Title = styled.Text<ITitle>`
  font-family: 'RobotoSlab-Medium';
  font-size: ${props => props.size || 20 }px;
  color: ${props => props.color ? theme.colors[props.color] : theme.colors.white };
`

interface ISpacer {
  width: string
  height: string
}
export const Spacer = styled.View<ISpacer> `
  width: ${props => props.width || '100%'};
  height: ${props => props.height || 10}px;
`
