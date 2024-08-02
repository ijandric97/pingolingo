import AnimatedPingo from '@/components/AnimatedPingo'
import BorderButton from '@/components/Button/BorderButton'
import PredictionText from '@/components/PredictionText'
import { useTranslate } from '@/i18n'
import { TQuestionAttempt, TQuestionCategory } from '@/types'
import { getStatsFromAttempts } from '@/utils/lessonUtils'
import { Group, Stack, Title } from '@mantine/core'
import { Link } from '@tanstack/react-router'
import { useMemo } from 'react'

type TCompletedLessonProps = {
  category: TQuestionCategory
  attempts: TQuestionAttempt[]
  startTimestamp: number
  hearts: number
}

const LessonCompleted = ({
  category,
  attempts,
  startTimestamp,
  hearts,
}: TCompletedLessonProps) => {
  const { t } = useTranslate()
  const { accuracy, time, xp } = useMemo(
    () => getStatsFromAttempts(attempts, hearts, startTimestamp),
    [],
  )

  return (
    <Stack gap="xl" py="sm" px="md" justify="center" align="center">
      <Title order={3}>{t('LessonPage.Completed.Title')}</Title>
      <AnimatedPingo isSad={xp <= 0 || hearts <= 0} />
      <Group w="100%" maw="400px" grow>
        <PredictionText
          color={xp <= 0 ? 'red' : 'green'}
          size={3}
          label={t('LessonPage.Completed.Accuracy')}
          value={`${accuracy}%`}
        />
        <PredictionText
          color={xp <= 0 ? 'red' : 'blue'}
          size={3}
          label={t('LessonPage.Completed.Time')}
          value={`${time}`}
        />
        <PredictionText
          color={xp <= 0 ? 'red' : 'yellow'}
          size={3}
          label={t('LessonPage.Completed.XP')}
          value={`${xp}`}
        />
      </Group>
      <Link from="/" to={category === 'numbers' ? '/numbers' : '/letters'}>
        <BorderButton>{t('LessonPage.Completed.Continue')}</BorderButton>
      </Link>
    </Stack>
  )
}

export default LessonCompleted
