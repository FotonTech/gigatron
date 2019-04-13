import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import styled from 'styled-components/native'

type Props = {}

const WelcomeText = styled(Text)`
  color: #a300fb;
  font-size: 23;
`

export default class Hello extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <WelcomeText>Welcome to Gigatron 🤖</WelcomeText>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
})
