import React from 'react'
import Welcome from './Welcome'
import { View } from 'react-native'
// import styled from 'styled-components/native'

// const Wrapper = styled.View`
//   flex: 1;
//   justify-content: center;
//   align-items: center;
// `

const App = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Welcome />
  </View>
)

export default App
