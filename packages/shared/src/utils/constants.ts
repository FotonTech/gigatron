import { Platform } from 'react-native'

export const isWeb = Platform.OS === 'web'
export const isIos = Platform.OS === 'ios'
export const isAndroid = Platform.OS === 'android'
