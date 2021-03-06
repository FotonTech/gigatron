import { isWeb } from './constants'

export const vh = (percent: number) => (isWeb ? `${percent}vh` : `${percent}%`)
export const vw = (percent: number) => (isWeb ? `${percent}vw` : `${percent}%`)

/**
 * Colors
 */
export const grey85 = '#858585'
