import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable'
import styled from 'styled-components/native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Hideo } from 'react-native-textinput-effects';
import { iOSUIKit } from 'react-native-typography'

const OutWrapper = styled.View`
  width: 100%;
  margin-top: 15;
  margin-bottom: 15;
`;

const Wrapper = styled.View`
  width: 100%;
  background-color: ${(p: any) => p.theme.colors.primaryBackground};
  z-index: 999;
  border-radius: 20px;
  background-color: red;
  height: 45px;
  overflow: hidden;
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

const Label = styled.Text`
  font-size: ${(p: any) => p.theme.fontSizes.medium};
  color: ${(p: any) => (p.isFocused ? p.theme.colors.primaryText : p.theme.colors.primaryText)};
  font-weight: bold;
  margin-left: 10;
  padding-bottom: 10;
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
  iconName: string
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
  iconName,
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
    <OutWrapper>
      <Label>{label}</Label>
      <Wrapper>
          <Hideo
            iconClass={FontAwesomeIcon}
            iconName={iconName}
            iconColor={errorMessage ? 'red' : '#7F00FF'}
            // this is used as backgroundColor of icon container view.
            iconBackgroundColor={'white'}
            inputStyle={{ color: 'black',   height: 45 }}
            style={{ borderRadius: 20}}
            onChangeText={onChange}
            secureTextEntry={isSecure}
            autoCapitalize="none"
          />
      </Wrapper>
      {errorMessage && <ErrorLabel>{errorMessage}</ErrorLabel>}
    </OutWrapper>
  )
}

export default Input