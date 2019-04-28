import React, { ReactChild } from 'react'
import { TouchableOpacity } from 'react-native'
import { Link } from '@react-navigation/web'
import NavigationService from './navigation'
import { isWeb } from './constants'
import { NavigationParams } from 'react-navigation'

export type LinkProps = {
  routeName: string
  params?: NavigationParams
  children?: ReactChild
  [key: string]: any
}

const CustomLink = isWeb
  ? (props: LinkProps) => <Link routeName={props.routeName}>{props.children}</Link>
  : (props: LinkProps) => (
      <TouchableOpacity
        onPress={() => NavigationService.navigate(props.routeName, { ...props.params })}
      >
        {props.children}
      </TouchableOpacity>
    )

export default CustomLink
