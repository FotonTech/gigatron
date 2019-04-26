import React from 'react'
import { TextInput } from 'react-native'
import styled from 'styled-components'

interface Props {
  error: any
}

const GigaText = styled(TextInput)`
  justify-content: center;
  align-items: center;
  background-color: #d5d5d5;
  width: 100%;
  height: 50px;
  border-radius: 5px;
  margin: 10px;
  padding-left: 10px;
  border-color: #d5d5d5;
  border-width: 2px;
  ${(p: Props) => p.error && `border-color: red`}
`

export default props => <GigaText {...props} />
