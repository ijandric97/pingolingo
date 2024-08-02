import { MAX_HEARTS, MAX_STEPS } from '@/constants'
import { COURSES } from '@/courses'
import { TCourseSymbol } from '@/courses/types'
import { TQuestionAttempt, TQuestionCategory, TQuestionType } from '@/types'
import {
  getQuestions,
  getSymbolsForQuestions,
  getXPFromAttempts,
} from '@/utils/lessonUtils'
import { clamp, shuffle } from 'lodash'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { useCacheStore } from './cacheStore'
import { useSettingsStore } from './settingsStore'
import { useStatisticsStore } from './statisticsStore'

export interface ILessonProps {
  category: TQuestionCategory
  questions: TQuestionType[]
  symbols: TCourseSymbol[]
  hearts: number
  currentStep: number
  totalSteps: number
  startTimestamp: number
  attempts: TQuestionAttempt[]
}

const INITIAL_LESSON_PROPS: ILessonProps = {
  category: 'numbers',
  questions: [],
  symbols: [],
  hearts: MAX_HEARTS,
  currentStep: 0,
  totalSteps: MAX_STEPS,
  startTimestamp: 0,
  attempts: [],
}

export interface ILessonStore extends ILessonProps {
  clearLesson: () => void
  newLesson: (category: TQuestionCategory) => void
  goNextStep: () => void
  addAttempt: (newAttempt: TQuestionAttempt) => void
}

export const useLessonStore = create<ILessonStore>()(
  devtools(
    (set, get) => ({
      ...INITIAL_LESSON_PROPS,
      clearLesson: () =>
        set({ ...INITIAL_LESSON_PROPS }, undefined, 'clearLesson'),
      newLesson: (category) => {
        const course = COURSES.find(
          (c) => c.id === useSettingsStore.getState().courseId,
        )
        const symbols = getSymbolsForQuestions(
          category,
          course?.symbols ?? [],
          useStatisticsStore.getState().attempts,
        )

        if (course) {
          useCacheStore.getState().cacheImages([course.imagePath])
        }

        set(
          () => ({
            ...INITIAL_LESSON_PROPS,
            category: category,
            symbols: symbols,
            questions: getQuestions(
              useSettingsStore.getState().gesturesEnabled,
              category,
            ),
            startTimestamp: Date.now(),
          }),
          undefined,
          'newLesson',
        )
      },
      addAttempt: (newAttempt: TQuestionAttempt) => {
        set(
          (state) => ({
            ...state,
            hearts: clamp(
              !useSettingsStore.getState().heartsEnabled || newAttempt.success
                ? state.hearts
                : state.hearts - 1,
              0,
              MAX_HEARTS,
            ),
            attempts: [...state.attempts, newAttempt],
          }),
          undefined,
          'addAttempt',
        )
      },
      goNextStep: () => {
        // Sanity check, we cannot go above TOTAL
        const { totalSteps, currentStep, hearts, attempts } = get()
        if (currentStep === totalSteps) return

        // Next step will finish the game, therefore upload the stats
        if (hearts <= 0 || currentStep + 1 === totalSteps) {
          const xp = getXPFromAttempts(attempts, hearts)
          useStatisticsStore.getState().addQuestionAttempts(attempts, xp)
        }

        let symbols: TCourseSymbol[] = []
        const category = get().category

        if (category === 'words') {
          const course = COURSES.find(
            (c) => c.id === useSettingsStore.getState().courseId,
          )
          symbols = getSymbolsForQuestions(
            category,
            course?.symbols ?? [],
            useStatisticsStore.getState().attempts,
          )
        } else {
          symbols = shuffle(get().symbols)
        }

        set(
          (state) => ({
            symbols: symbols,
            currentStep: hearts <= 0 ? state.totalSteps : state.currentStep + 1,
          }),
          undefined,
          'goNextStep',
        )
      },
    }),
    {
      name: 'lessonStore',
      enabled: import.meta.env.DEV, // Vite Specific
    },
  ),
)
