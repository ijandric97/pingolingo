import BorderButton from '@/components/Button/BorderButton'
import { COURSES } from '@/courses'
import { useTranslate } from '@/i18n'
import { useLessonStore } from '@/store/lessonStore'
import { useSettingsStore } from '@/store/settingsStore'
import { useStatisticsStore } from '@/store/statisticsStore'
import {
  getAllSymbolsCompleted,
  getFilteredSymbolsWithPercentages,
} from '@/utils/lessonUtils'
import { Stack, Text, Title } from '@mantine/core'
import { Link } from '@tanstack/react-router'
import { useMemo } from 'react'

import classes from './LessonError.module.css'

const LessonError = () => {
  const { t } = useTranslate()

  const newLesson = useLessonStore((state) => state.newLesson)
  const attempts = useStatisticsStore((state) => state.attempts)
  const courseId = useSettingsStore((state) => state.courseId)

  const letters = useMemo(
    () =>
      getFilteredSymbolsWithPercentages(
        'letters',
        COURSES.find((c) => c.id === courseId)?.symbols ?? [],
        attempts,
      ),
    [attempts, courseId],
  )

  const allCompleted = useMemo(() => getAllSymbolsCompleted(letters), [letters])

  return (
    <Stack gap="xl" py="xl" px="md" justify="center" align="center">
      <Title order={3}>{t('LessonPage.Error.Title')}</Title>
      <Text className={classes.info}>{t('LessonPage.Error.Info')}</Text>
      {!allCompleted && (
        <Link to="/lesson" onClick={() => newLesson('words')}>
          <BorderButton color="green">
            {t('LettersPage.FingerspellButton')}
          </BorderButton>
        </Link>
      )}
      <Link to="/lesson" onClick={() => newLesson('letters')}>
        <BorderButton>{t('LettersPage.LearnButton')}</BorderButton>
      </Link>
      <Link to="/lesson" onClick={() => newLesson('numbers')}>
        <BorderButton>{t('NumbersPage.LearnButton')}</BorderButton>
      </Link>
    </Stack>
  )
}

export default LessonError
