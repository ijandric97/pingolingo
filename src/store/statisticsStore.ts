import type { TQuestionAttempt } from '@/types'
import { downloadBlob, openFile, validateStatistics } from '@/utils/lessonUtils'
import dayjs from 'dayjs'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { useSettingsStore } from './settingsStore'

interface IStatisticsProps {
  totalXp: number
  attempts: TQuestionAttempt[]
}

const INITIAL_STATISTICS_PROPS: IStatisticsProps = {
  totalXp: 0,
  attempts: [],
}

export interface IStatisticsStore extends IStatisticsProps {
  addQuestionAttempts: (attempt: TQuestionAttempt[], xp: number) => void
  resetStatistics: () => void
  exportStatistics: () => void
  importStatistics: () => void
}

export const useStatisticsStore = create<IStatisticsStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...INITIAL_STATISTICS_PROPS,
        addQuestionAttempts: (attempts, xp) =>
          set(
            (state) => ({
              attempts: [...state.attempts, ...attempts],
              totalXp: state.totalXp + xp,
            }),
            undefined,
            'addQuestionAttempts',
          ),
        resetStatistics: () =>
          set({ attempts: [], totalXp: 0 }, undefined, 'resetStatistics'),
        exportStatistics: () => {
          downloadBlob(
            JSON.stringify({
              totalXp: get().totalXp,
              attempts: get().attempts,
            }),
            `${dayjs().format('YYYY-MM-DD')}_PingoLingo_${useSettingsStore.getState().username}.json`,
          )
        },
        importStatistics: async () => {
          const fileText = await openFile()
          const isValid = validateStatistics(fileText)

          if (!isValid) {
            window.alert('FILE IMPORT VALIDATION FAIL')
            return
          }

          const parsed = JSON.parse(fileText)
          set({ attempts: parsed.attempts, totalXp: parsed.totalXp })
        },
      }),
      { name: 'statisticsStore' },
    ),
    {
      name: 'statisticsStore',
      enabled: import.meta.env.DEV, // Vite Specific
    },
  ),
)
