import { isWeb } from './constants'

let _AsyncStorage = {
  getItem: (key: string) =>
    new Promise<string | null>((resolve, reject) => {
      try {
        const result = window.localStorage.getItem(key)
        resolve(result)
      } catch (error) {
        reject(error)
      }
    }),
  setItem: async (key: string, value: string) =>
    new Promise<void>((resolve, reject) => {
      try {
        window.localStorage.setItem(key, value)
        resolve()
      } catch (error) {
        reject(error)
      }
    }),
  removeItem: async (key: string) =>
    new Promise<void>((resolve, reject) => {
      try {
        window.localStorage.removeItem(key)
        resolve()
      } catch (error) {
        reject(error)
      }
    }),
}
if (!isWeb) {
  _AsyncStorage = require('@react-native-community/async-storage').default
}
export const AsyncStorage = _AsyncStorage

export default {
  AsyncStorage: _AsyncStorage,
}
