import BorderButton from '@/components/Button/BorderButton'
import ProgressButton from '@/components/Button/ProgressButton'
import HelpModal from '@/components/Modal/HelpModal'
import { COURSES } from '@/courses'
import { TCourseSymbolPercentage } from '@/courses/types'
import { useTranslate } from '@/i18n'
import { useLessonStore } from '@/store/lessonStore'
import { useSettingsStore } from '@/store/settingsStore'
import { useStatisticsStore } from '@/store/statisticsStore'
import { getFilteredSymbolsWithPercentages } from '@/utils/lessonUtils'
import { Center, Container, Flex } from '@mantine/core'
import { useDocumentTitle } from '@mantine/hooks'
import { Link } from '@tanstack/react-router'
import { useMemo, useState } from 'react'

const NumbersPage = () => {
  const { t } = useTranslate()
  useDocumentTitle(t('NumbersPage.Title'))

  const newLesson = useLessonStore((state) => state.newLesson)
  const attempts = useStatisticsStore((state) => state.attempts)
  const courseId = useSettingsStore((state) => state.courseId)

  const numbers = useMemo(
    () =>
      getFilteredSymbolsWithPercentages(
        'numbers',
        COURSES.find((c) => c.id === courseId)?.symbols ?? [],
        attempts,
      ),
    [attempts, courseId],
  )

  const [helpSymbol, setHelpSymbol] = useState<TCourseSymbolPercentage | null>(
    null,
  )

  return (
    <>
      <Container>
        <Center py="xl">
          <Link to="/lesson" onClick={() => newLesson('numbers')}>
            <BorderButton>{t('NumbersPage.LearnButton')}</BorderButton>
          </Link>
        </Center>
        <Flex
          direction="row"
          align="center"
          justify="center"
          gap="xl"
          wrap="wrap"
          py="xl"
        >
          {numbers.map((el) => (
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

export default NumbersPage
