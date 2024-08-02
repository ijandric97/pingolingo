export type TTheme = 'light' | 'dark'

export const QUESTION_CATEGORIES = ['letters', 'numbers', 'words'] as const
export type TQuestionCategory = (typeof QUESTION_CATEGORIES)[number]

export const QUESTION_TYPES = [
  'camera',
  'connect',
  'choice_symbol',
  'choice_hand',
] as const
export type TQuestionType = (typeof QUESTION_TYPES)[number]

export type TQuestionAttempt = {
  category: TQuestionCategory
  symbolIds: string[]
  timestamp: number
  type: TQuestionType
  success: boolean
}
export type TQuestionReturn = Pick<TQuestionAttempt, 'symbolIds' | 'success'>

export type TModalState = 'success' | 'error' | null
