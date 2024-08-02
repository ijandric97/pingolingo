import { ECourseIds } from '.'

export type TCourseModel = {
  id: string
  modelPath: string
  isSynthetic: boolean
  isNumber: boolean
}

export type TCourseSymbol = {
  id: string
  name: string
  imagePath: string
  handImagePaths: string[]
  isNumber: boolean
}

export type TCourseSymbolPercentage = TCourseSymbol & {
  percentage: number
}

export type TCourse = {
  /** Should be a unique identifier */
  id: ECourseIds
  /**  Translation string for i18n */
  name: string
  /** Will be displayed in the Course selector */
  imagePath: string
  /** Path to the ML tasks */
  models: TCourseModel[]
  /** List of symbols */
  symbols: TCourseSymbol[]
}
