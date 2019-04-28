import { Platform } from 'react-native'

export const isWeb = Platform.OS === 'web'

export const _100vh = isWeb ? '100vh' : '100%'
export const _100vw = isWeb ? '100vw' : '100%'
