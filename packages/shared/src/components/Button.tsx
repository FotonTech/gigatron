import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import styled from 'styled-components'

const Button = ({ text, isSubmitting }) => (
  <Touchable>
    {isSubmitting ? (
      <ActivityIndicator size='small' color='#0000ff' />
    ) : (
      <StyledText>{text}</StyledText>
    )}
  </Touchable>
)

const Touchable = styled(View)`
  justify-content: center;
  align-items: center;
  background-color: #d5d5d5;
  width: 150px;
  height: 60px;
  border-radius: 5px;
  margin: 10px;
`

const StyledText = styled(Text)`
  color: #ffffff;
  font-size: 21px;
  font-weight: bold;
`

export default Button
