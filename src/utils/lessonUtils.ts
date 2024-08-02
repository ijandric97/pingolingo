import { MAX_STEPS } from '@/constants'
import { TCourseSymbol, TCourseSymbolPercentage } from '@/courses/types'
import { useCacheStore } from '@/store/cacheStore'
import {
  QUESTION_CATEGORIES,
  QUESTION_TYPES,
  TQuestionAttempt,
  TQuestionCategory,
  TQuestionType,
} from '@/types'
import { faker } from '@faker-js/faker'
import dayjs from 'dayjs'
import { clamp, random, shuffle, sumBy } from 'lodash'

export const getFilteredSymbolsWithPercentages = (
  category: TQuestionCategory,
  symbols: TCourseSymbol[],
  attempts: TQuestionAttempt[],
): TCourseSymbolPercentage[] => {
  if (category === 'words') {
    return symbols.map((s) => ({
      ...s,
      percentage: 100,
    }))
  }

  const filteredAttempts = attempts.filter(
    (a) =>
      a.category === category ||
      (category === 'letters' && a.category === 'words'),
  )

  return symbols
    .filter(
      (s) =>
        (category === 'numbers' && s.isNumber) ||
        (category === 'letters' && !s.isNumber),
    )
    .map((s) => {
      const percentage = clamp(
        filteredAttempts.filter((a) => a.success && a.symbolIds.includes(s.id))
          .length,
        0,
        100,
      )

      return {
        ...s,
        percentage,
      }
    })
}

export const getSymbolsForQuestions = (
  category: TQuestionCategory,
  symbols: TCourseSymbol[],
  attempts: TQuestionAttempt[],
): TCourseSymbolPercentage[] => {
  const symbolsWPercentages = getFilteredSymbolsWithPercentages(
    category,
    symbols,
    attempts,
  )

  let symbolsForQuestions: TCourseSymbolPercentage[] = []

  if (category === 'words') {
    for (const letter of faker.word.sample().toUpperCase()) {
      const found = symbolsWPercentages.find((s) => s.name === letter)
      if (found) {
        symbolsForQuestions.push(found)
      }
    }
  } else {
    symbolsForQuestions = shuffle(
      symbolsWPercentages.filter((s) => s.percentage < 100),
    )

    symbolsForQuestions =
      symbolsForQuestions.length > 5
        ? symbolsForQuestions.slice(0, 5)
        : [
            ...symbolsForQuestions,
            ...shuffle(
              symbolsWPercentages.filter((s) => s.percentage >= 100),
            ).slice(0, 5 - symbolsForQuestions.length),
          ]
  }

  const cacheImagePaths: string[] = []
  for (const symbol of symbolsForQuestions) {
    cacheImagePaths.push(symbol.imagePath, ...symbol.handImagePaths)
  }
  useCacheStore.getState().cacheImages(cacheImagePaths)

  return symbolsForQuestions
}

export const getQuestions = (
  gesturesEnabled: boolean,
  category: TQuestionCategory,
): TQuestionType[] => {
  const questions: TQuestionType[] = []

  if (category !== 'words') {
    const numberOfConnect = random(
      gesturesEnabled ? 3 : 4,
      gesturesEnabled ? 4 : 5,
      false,
    )
    for (let i = 0; i < numberOfConnect; i++) {
      questions.push('connect')
    }

    const numberOfSymbolChoice = random(
      gesturesEnabled ? 4 : 5,
      gesturesEnabled ? 5 : 6,
      false,
    )
    for (let i = 0; i < numberOfSymbolChoice; i++) {
      questions.push('choice_symbol')
    }

    const numberOfHandChoice = gesturesEnabled
      ? random(3, 4, false)
      : MAX_STEPS - numberOfConnect - numberOfSymbolChoice
    for (let i = 0; i < numberOfHandChoice; i++) {
      questions.push('choice_hand')
    }

    const numberOfCamera = gesturesEnabled
      ? MAX_STEPS - numberOfConnect - numberOfSymbolChoice - numberOfHandChoice
      : 0
    for (let i = 0; i < numberOfCamera; i++) {
      questions.push('camera')
    }
  } else {
    const numberOfFingerspell = gesturesEnabled ? 8 : MAX_STEPS
    for (let i = 0; i < numberOfFingerspell; i++) {
      questions.push('choice_hand')
    }
    const numberOfCamera = gesturesEnabled ? MAX_STEPS - numberOfFingerspell : 0
    for (let i = 0; i < numberOfCamera; i++) {
      questions.push('camera')
    }
  }

  return shuffle(questions)
}

export const getXPFromAttempts = (
  attempts: TQuestionAttempt[],
  hearts: number,
) => {
  return hearts > 0 ? sumBy(attempts, (a) => (a.success ? 1 : 0)) : 0
}

export const getStatsFromAttempts = (
  attempts: TQuestionAttempt[],
  hearts: number,
  startTimestamp: number,
) => {
  const xp = getXPFromAttempts(attempts, hearts)
  const accuracy = attempts.length
    ? Math.round((xp / attempts.length) * 100)
    : 0
  const time = dayjs(Date.now() - startTimestamp).format('mm:ss')

  return { xp, accuracy, time }
}

export const getAllSymbolsCompleted = (symbols: TCourseSymbolPercentage[]) => {
  return symbols.every((s) => s.percentage >= 100)
}

export const downloadBlob = (
  data: ArrayBufferView | ArrayBuffer | string,
  name: string,
  options?: { type: string },
) => {
  const blob = new Blob([data], options)
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = name
  link.target = '_blank'
  link.click()

  link.remove()
}

export const openFile = async () => {
  return new Promise<string>((resolve, reject) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.multiple = false

    const reader = new FileReader()
    reader.onload = () => {
      if (!reader.result || typeof reader.result !== 'string') {
        reject('File is empty or incompatible')
        return
      }

      resolve(reader.result)
    }

    input.onchange = () => {
      const file = Array.from(input.files ?? []).at(0) ?? null
      if (!file) {
        reject('No file selected')
        return
      }

      reader.readAsText(file)
    }
    input.onabort = () => {
      reject('Aborted')
    }

    input.click()
  })
}

export const validateStatistics = (fileText: string) => {
  try {
    const parsedFile = JSON.parse(fileText)

    if (
      typeof parsedFile.totalXp !== 'number' ||
      !Array.isArray(parsedFile.attempts)
    )
      return false

    for (const entry of parsedFile.attempts) {
      if (!entry.category || !QUESTION_CATEGORIES.includes(entry.category))
        return false
      if (
        !entry.symbolIds ||
        !Array.isArray(entry.symbolIds) ||
        entry.symbolIds.length <= 0
      )
        return false
      if (typeof entry.timestamp !== 'number' || entry.timestamp < 0)
        return false
      if (!entry.type || !QUESTION_TYPES.includes(entry.type)) return false
      if (typeof entry.success !== 'boolean') return false
    }

    // FILE IS OK
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
