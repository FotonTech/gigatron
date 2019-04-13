import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import OpenSettings from 'react-native-open-settings'
import Welcome from '@foton/shared/components/Welcome'

type Props = {}

export default class App extends Component<Props> {
  handlePress = () => {
    OpenSettings.openSettings()
  }

  render() {
    return (
      <Container>
        <Welcome />
        <TouchableOpacity onPress={this.handlePress}>
          <BigText>Open settings</BigText>
        </TouchableOpacity>
        <SmallText>(this is a native lib)</SmallText>
      </Container>
    )
  }
}

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5fcff;
`

const BigText = styled(Text)`
  font-size: 20;
  margin-bottom: 10;
`

const SmallText = styled(BigText)`
  font-size: 10;
`
