import BorderButton from '@/components/Button/BorderButton'
import ProgressButton from '@/components/Button/ProgressButton'
import HelpModal from '@/components/Modal/HelpModal'
import { COURSES } from '@/courses'
import { TCourseSymbolPercentage } from '@/courses/types'
import { useTranslate } from '@/i18n'
import { useLessonStore } from '@/store/lessonStore'
import { useSettingsStore } from '@/store/settingsStore'
import { useStatisticsStore } from '@/store/statisticsStore'
import {
  getAllSymbolsCompleted,
  getFilteredSymbolsWithPercentages,
} from '@/utils/lessonUtils'
import { Container, Flex, Group } from '@mantine/core'
import { useDocumentTitle } from '@mantine/hooks'
import { Link } from '@tanstack/react-router'
import { useMemo, useState } from 'react'

const LettersPage = () => {
  const { t } = useTranslate()
  useDocumentTitle(t('LettersPage.Title'))

  const newLesson = useLessonStore((state) => state.newLesson)
  const attempts = useStatisticsStore((state) => state.attempts)
  const courseId = useSettingsStore((state) => state.courseId)
  const forceFingerspellEnabled = useSettingsStore(
    (state) => state.forceFingerspellEnabled,
  )

  const letters = useMemo(
    () =>
      getFilteredSymbolsWithPercentages(
        'letters',
        COURSES.find((c) => c.id === courseId)?.symbols ?? [],
        attempts,
      ),
    [attempts, courseId],
  )

  const [helpSymbol, setHelpSymbol] = useState<TCourseSymbolPercentage | null>(
    null,
  )

  const allCompleted = useMemo(() => getAllSymbolsCompleted(letters), [letters])

  return (
    <>
      <Container>
        <Group py="xl" align="center" justify="center">
          {(allCompleted || forceFingerspellEnabled) && (
            <Link to="/lesson" onClick={() => newLesson('words')}>
              <BorderButton color="green">
                {t('LettersPage.FingerspellButton')}
              </BorderButton>
            </Link>
          )}
          <Link to="/lesson" onClick={() => newLesson('letters')}>
            <BorderButton>{t('LettersPage.LearnButton')}</BorderButton>
          </Link>
        </Group>
        <Flex
          direction="row"
          align="center"
          justify="center"
          gap="xl"
          wrap="wrap"
          py="xl"
        >
          {letters.map((el) => (
            <ProgressButton
              key={el.id}
              size="xl"
              variant="default"
              value={el.percentage}
              color={el.percentage < 100 ? 'orange' : 'green'}
              onClick={() => setHelpSymbol(el)}
            >
              {el.name}
            </ProgressButton>
          ))}
        </Flex>
      </Container>
      <HelpModal symbol={helpSymbol} onClose={() => setHelpSymbol(null)} />
    </>
  )
}

export default LettersPage
