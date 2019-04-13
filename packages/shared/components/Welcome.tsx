import React, { Component } from 'react'
import { Text, View } from 'react-native'
import styled from 'styled-components/native'

type Props = {}

export default class Welcome extends Component<Props> {
  render() {
    return (
      <Container>
        <WelcomeText>Welcome to Gigatron 🤖</WelcomeText>
      </Container>
    )
  }
}

const WelcomeText = styled(Text)`
  color: #a300fb;
  font-size: 23;
  margin: 40px;
`

const Container = styled(View)`
  justify-content: center;
  align-items: center;
  background-color: #f5fcff;
`
