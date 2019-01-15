import React, { Component } from 'react';
import styled from 'styled-components';

interface WrapperProps {
  first?: boolean
}

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  height: 90px;
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background: #110E16;
  margin-top: 1px;
  ${p => p.first && `
  border-top-left-radius: 20px
  border-top-right-radius: 20px
  `}
`;
const LeftWrapper = styled.div`
  display: flex;
  height: 90px;
  width: 90px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RightWrapper = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const InitialsBubble = styled.div`
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  width: 70px;
  height: 70px;
  border-radius: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
`
const InitialsText = styled.p`
  font-size: 33px;
  font-weight: 900;
  color: #3F5EFB;
`
const NameText = styled.p`
  color: white;
  font-weight: 900;
  font-size: 33px;
  margin: 0;
  margin-top: 10px;
`
const EmailText = styled.p`
  margin: 0;
  font-size: 14px;
  color: white;
  color: #3F5EFB;
  margin-top: 0px;
  margin-left: 3px;
`

interface UserItemProps {
  name: string
  email: string
  first?: boolean
}

export default ({name, email, first}: UserItemProps) => (
  <Wrapper first={first}>
    <LeftWrapper>
      <InitialsBubble>
        <InitialsText>GJ</InitialsText>
      </InitialsBubble>
    </LeftWrapper>
    <RightWrapper>
      <NameText>{name}</NameText>
      <EmailText>{email}</EmailText>
    </RightWrapper>
  </Wrapper>
)