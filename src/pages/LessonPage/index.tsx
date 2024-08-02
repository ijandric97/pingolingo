import LessonModal from '@/components/Modal/LessonModal'
import { useTranslate } from '@/i18n'
import { useLessonStore } from '@/store/lessonStore'
import { TModalState, TQuestionReturn } from '@/types'
import { useDocumentTitle } from '@mantine/hooks'
import { useCallback, useState } from 'react'

import LessonCompleted from './LessonCompleted'
import LessonError from './LessonError'
import classes from './LessonPage.module.css'
import QuestionCamera from './QuestionCamera'
import QuestionChoice from './QuestionChoice'
import QuestionConnect from './QuestionConnect'

const LessonPage = () => {
  const { t } = useTranslate()
  useDocumentTitle(`${t('LessonPage.Title')}`)

  const [modalState, setModalState] = useState<TModalState>(null)

  const {
    hearts,
    attempts,
    startTimestamp,
    category,
    questions,
    symbols,
    currentStep,
    totalSteps,
    addAttempt,
    goNextStep,
  } = useLessonStore((state) => ({
    hearts: state.hearts,
    attempts: state.attempts,
    startTimestamp: state.startTimestamp,
    category: state.category,
    questions: state.questions,
    symbols: state.symbols,
    currentStep: state.currentStep,
    totalSteps: state.totalSteps,
    addAttempt: state.addAttempt,
    goNextStep: state.goNextStep,
  }))

  const onQuestionComplete = useCallback(
    ({ success, symbolIds: symbolId }: TQuestionReturn) => {
      setModalState(success ? 'success' : 'error')
      addAttempt({
        success,
        symbolIds: symbolId,
        timestamp: Date.now(),
        category: category,
        type: questions[currentStep],
      })
    },
    [questions, currentStep, category, setModalState, addAttempt],
  )

  const isError = !questions.length
  const isCompleted = currentStep >= totalSteps
  const isWord = category === 'words'
  const questionType = questions[currentStep]

  return (
    <>
      <div className={classes.page}>
        {isError && <LessonError />}
        {!isError && isCompleted && (
          <LessonCompleted
            category={category}
            attempts={attempts}
            startTimestamp={startTimestamp}
            hearts={hearts}
          />
        )}
        {!isError && !isCompleted && (
          <>
            {questionType === 'connect' && (
              <QuestionConnect
                symbols={symbols}
                onComplete={onQuestionComplete}
              />
            )}
            {questionType === 'camera' && (
              <QuestionCamera
                symbols={symbols}
                isWord={isWord}
                onComplete={onQuestionComplete}
              />
            )}
            {(questionType === 'choice_hand' ||
              questionType === 'choice_symbol') && (
              <QuestionChoice
                isHand={questionType === 'choice_hand'}
                isWord={isWord}
                symbols={symbols}
                onComplete={onQuestionComplete}
              />
            )}
          </>
        )}
      </div>
      <LessonModal
        isOpen={!!modalState}
        modalState={modalState}
        onClose={() => {
          goNextStep()
          setModalState(null)
        }}
      />
    </>
  )
}

export default LessonPage
