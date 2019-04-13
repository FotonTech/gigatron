import React, { Component } from 'react'
import { Text, View } from 'react-native'
import styled from 'styled-components'

type Props = {}

export default class Welcome extends Component<Props> {
  render() {
    return <WelcomeText> Welcome to gigatron </WelcomeText>
  }
}

const WelcomeText = styled(Text)`
  color: #a300fb;
  font-size: 23;
  margin: 40px;
`
