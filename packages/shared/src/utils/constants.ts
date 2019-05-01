import { Platform } from 'react-native'

export const isWeb = Platform.OS === 'web'
export const isiOS = Platform.OS === 'ios'
export const isAndroid = Platform.OS === 'android'
