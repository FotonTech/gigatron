import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import styled from 'styled-components/native'

type Props = {}

const HelloText = styled(Text)`
  color: pink;
  font-size: 15;
`

export default class Hello extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <HelloText>Hello</HelloText>
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
