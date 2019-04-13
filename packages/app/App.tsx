import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import OpenSettings from 'react-native-open-settings'
import Welcome from '@foton/shared/components/Welcome'

type Props = {}
const Instructions = styled(Text)`
  text-align: center;
  margin: 10px;
`

export default class App extends Component<Props> {
  handlePress = () => {
    OpenSettings.openSettings()
  }

  render() {
    return (
      <View style={styles.container}>
        <Welcome />
        <Instructions>To get started, edit App.js</Instructions>
        <TouchableOpacity onPress={this.handlePress}>
          <Text style={styles.welcome}>Open settings</Text>
          <Text style={styles.small}>(this is a native lib)</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  small: {
    fontSize: 10,
    textAlign: 'center',
  },
  instructions: {
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    marginTop: 30,
  },
})
