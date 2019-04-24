import React from 'react'
import { Platform, TouchableOpacity } from 'react-native'
import { Link } from '@react-navigation/web'
import NavigationService from './navigation'

const CustomLink = (props: any) => {
  if (Platform.OS === 'web') {
    return <Link routeName={props.routeName}>{props.children}</Link>
  } else {
    return (
      <TouchableOpacity
        onPress={() => NavigationService.navigate(props.routeName, { ...props.params })}
      >
        {props.children}
      </TouchableOpacity>
    )
  }
}

export default CustomLink
