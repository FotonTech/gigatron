import React, { useState } from 'react';
import styled, { css } from 'styled-components/native';


interface ThemeProps {
  theme: any
}

interface Props extends ThemeProps {
  size: 'small' | 'normal' | 'big' | 'huge'
  tint: 'primary' | 'secondary' | 'disabled'
  strong: boolean
}

export default styled.Text`
  font-size: ${(p: Props) => {
      switch(p.size) {
        case 'small':
          return p.theme.fontSizes.small
        case 'normal':
          return p.theme.fontSizes.normal
        case 'big':
          return p.theme.fontSizes.big
        case 'huge':
          return p.theme.fontSizes.huge
      }
    }};
  color: ${(p: Props) => {
      switch(p.tint) {
        case 'primary':
          return p.theme.colors.primaryText
        case 'secondary':
          return p.theme.colors.secondaryText
        case 'disabled':
          return p.theme.colors.disabled
      }
    }};
  ${(p: Props) => {
    return p.strong && `font-weight: bold`
  }};

`