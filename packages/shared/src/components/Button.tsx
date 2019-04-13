import React, { Component } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

const RedButton = styled.TouchableOpacity`
  width: 100px;
  height: 50px;
  background-color: red;
  justify-content: center;
  align-items: center;
`

const Button = ({ text }) => (
  <RedButton>
    <Text>{text}</Text>
  </RedButton>
)

export default Button
