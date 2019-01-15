import * as React from 'react'
import styled from 'styled-components/native'

const Wrapper = styled.View`
  align-self: center;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 28;
`

const StyledInput = styled.TextInput`
  height: 40;
  width: 80%;
  color: ${(p: any) => p.theme.color.secondaryText};
  font-size: ${(p: any) => p.theme.fontSize.large};
  border-width: 0;
  border-bottom-width: 1;
  border-color: ${(p: any) => p.theme.color.secondaryText};
`


interface Props {
  value: string
  placeholder: string
  onChange: (val: any) => void
  keyboardType?: string
}


const Input = ({
  value,
  placeholder,
  onChange,
  ...rest
}: Props) => {
  return (
    <Wrapper>
      <StyledInput
        onChangeText={(val: string) => onChange(val)}
        value={value}
        autoCapitalize="none"
        {...rest}
      />
    </Wrapper>
  )
}

export default Input