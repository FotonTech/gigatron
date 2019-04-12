import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

type Props = {}

export default class Hello extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.hello}>Hello</Text>
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
  hello: {
    color: 'pink',
    fontSize: 15,
  },
})
