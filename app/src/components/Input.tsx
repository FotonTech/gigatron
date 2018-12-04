import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable'
import styled from 'styled-components/native'

const Wrapper = styled.View`
  align-self: center;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${(p: any) => p.theme.colors.primaryBackground};
  margin-top: 30;
`

const StyledInput = styled.TextInput`
  height: 30;
  width: 100%;
  font-size: ${(p: any) => p.theme.fontSizes.normal};
  border-width: 0;
  border-bottom-width: ${(p: any) => (p.isFocused ? 2 : 1)};
  border-color: ${(p: any) => (p.isError ? p.theme.colors.error : p.theme.colors.primaryText)};
  color: ${(p: any) => p.theme.colors.primaryText};
`

const FloatingLabel = styled(Animatable.Text).attrs({
  transition: ['bottom', 'color', 'fontSize'],
  duration: 150,
})`
  position: absolute;
  left: 0;
  bottom: ${(p: any) => (p.isFocused ? 25 : 4)};
  font-size: ${(p: any) =>
    p.isFocused ? p.theme.fontSizes.small : p.theme.fontSizes.normal};
  color: ${(p: any) => (p.isFocused ? p.theme.colors.primaryText : p.theme.colors.primaryText)};
`

const ErrorLabel = styled(Animatable.Text)`
  position: absolute;
  left: 0;
  bottom: -18;
  font-size: ${(p: any) => p.theme.fontSizes.small};
  color: ${(p: any) => p.theme.colors.error};
`

interface Props {
  value: string
  label: string
  onChange: void
  isSecure?: boolean
  errorMessage?: string
  keyboardType?: string
}

interface State {
  isFocused: boolean
  validate: boolean
}

const Input = ({
  value,
  label,
  onChange,
  isSecure = false,
  errorMessage,
  ...rest
}: Props) => {
  const [state, setState] = useState({
    isFocused: false,
    validate: false,
  })
  const { isFocused, validate } = state

  const handleFocus = () => setState({ ...state, isFocused: true })
  const handleBlur = () => {
    setState({ ...state, validate: true })

    if (value === '') {
      setState({ ...state, isFocused: false })
    }
  }

  return (
    <Wrapper>
      <FloatingLabel isFocused={isFocused}>{label}</FloatingLabel>
        <StyledInput
          onChangeText={(val: string) => onChange(val)}
          value={value}
          secureTextEntry={isSecure}
          autoCapitalize="none"
          isFocused={isFocused}
          isError={errorMessage && validate}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />
      {errorMessage && <ErrorLabel>{errorMessage}</ErrorLabel>}
    </Wrapper>
  )
}

export default Input