/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
// import OpenSettings from 'react-native-open-settings';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
const MyText = styled(Text)`
color: green;
`;

export default class App extends Component<Props> {
  handlePress = () => {
    // OpenSettings.openSettings();
  }

  render() {
    return (
      <View style={styles.container}>
        <MyText style={styles.welcome}>Welcome to React Native!</MyText>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <TouchableOpacity onPress={this.handlePress}><Text style={styles.welcome}>Open settings</Text></TouchableOpacity>
      </View>
    );
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
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    marginTop: 30
  }
});
