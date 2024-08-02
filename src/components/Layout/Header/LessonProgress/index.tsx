import { useLessonStore } from '@/store/lessonStore'
import {
  Badge,
  CloseButton,
  DefaultMantineColor,
  Group,
  Progress,
} from '@mantine/core'
import { IconHeartFilled } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'
import { useMemo } from 'react'

import classes from './LessonProgress.module.css'

const LessonProgress = () => {
  const category = useLessonStore((state) => state.category)

  const hearts = useLessonStore((state) => state.hearts)
  const heartColor: DefaultMantineColor | undefined = useMemo(
    () =>
      hearts >= 3
        ? 'green'
        : hearts === 2
          ? 'orange'
          : hearts === 1
            ? 'red'
            : 'blue',
    [hearts],
  )

  const progress = useLessonStore((state) =>
    Math.max(
      Math.min(Math.round((state.currentStep / state.totalSteps) * 100), 100),
      0,
    ),
  )
  const progressColor: DefaultMantineColor | undefined = useMemo(
    () =>
      hearts <= 0 || progress <= 25
        ? 'red'
        : progress < 100
          ? 'yellow'
          : 'green',
    [hearts, progress],
  )

  return (
    <Group className={classes.flexGrow}>
      <Link from="/" to={category === 'numbers' ? '/numbers' : '/letters'}>
        <CloseButton />
      </Link>
      <Progress
        className={classes.flexGrow}
        value={hearts > 0 ? progress : 100}
        color={progressColor}
      />
      <Badge
        variant="transparent"
        color={heartColor}
        className={classes.text}
        leftSection={<IconHeartFilled />}
      >
        {hearts}
      </Badge>
    </Group>
  )
}

export default LessonProgress
