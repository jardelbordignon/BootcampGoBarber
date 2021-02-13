/**
 * background: linear-gradient(to right, rgba(250, 224, 66, 0.8) ${(props) => props.scroll}, transparent 0)
 */
import styled from 'styled-components'

interface Props {
  percent: string
  color?: string
}

const ProgressBar = styled.div<Props>`
  /* position: absolute;
  left: 50px;
  bottom: 15px; */
  background: linear-gradient(
    to right,
    ${(props) => props.color || '#67c7fa'} ${(props) => props.percent},
    transparent 0
  );
  width: 100%;
  height: 3px;
  z-index: 3;
`

export default ProgressBar
