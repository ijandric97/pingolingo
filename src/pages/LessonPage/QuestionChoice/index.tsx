import { TCourseSymbol } from '@/courses/types'
import { TQuestionReturn } from '@/types'

import QuestionChoiceNormal from './QuestionChoiceNormal'
import QuestionChoiceWord from './QuestionChoiceWord'

export type TQuestionChoiceProps = {
  isWord: boolean
  symbols: TCourseSymbol[]
  onComplete: (attempt: TQuestionReturn) => void
  isHand?: boolean
}

const QuestionChoice = ({
  isWord,
  symbols,
  onComplete,
  isHand = false,
}: TQuestionChoiceProps) => {
  return isWord ? (
    <QuestionChoiceWord symbols={symbols} onComplete={onComplete} />
  ) : (
    <QuestionChoiceNormal
      isHand={isHand}
      symbols={symbols}
      onComplete={onComplete}
    />
  )
}

export default QuestionChoice
