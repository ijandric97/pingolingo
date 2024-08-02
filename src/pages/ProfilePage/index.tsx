import { useTranslate } from '@/i18n'
import { useSettingsStore } from '@/store/settingsStore'
import { useStatisticsStore } from '@/store/statisticsStore'
import { Group, Stack } from '@mantine/core'
import { useDocumentTitle } from '@mantine/hooks'
import dayjs from 'dayjs'
import { clamp, groupBy, sortBy, toArray, uniq } from 'lodash'
import { useMemo } from 'react'

import classes from './ProfilePage.module.css'
import UserCalendar from './UserCalendar'
import UserInfo from './UserInfo'
import UserLinearChart from './UserLinearChart'
import UserPieCharts from './UserPieCharts'
import UserStats from './UserStats'

const ProfilePage = () => {
  const { t } = useTranslate()
  const [username, language] = useSettingsStore((state) => [
    state.username,
    state.language,
  ])
  useDocumentTitle(`${t('ProfilePage.Title')} - ${username}`)

  const stats = useStatisticsStore()

  const level = useMemo(
    () => (stats.totalXp ? Math.floor(stats.totalXp / 100) + 1 : 1),
    [stats.totalXp],
  )
  const joinedTimestamp = useMemo(
    () =>
      stats.attempts.length > 0
        ? Math.min(...stats.attempts.map((e) => e.timestamp))
        : 0,
    [stats.attempts],
  )
  const signsLearned = useMemo(
    () => uniq(stats.attempts.map((a) => a.symbolIds).flat()).length,
    [stats.attempts],
  )

  // CHARTS
  const accuracy = useMemo(() => {
    return clamp(
      Math.round(
        (stats.attempts.filter((a) => a.success).length /
          stats.attempts.length) *
          100,
      ),
      0,
      100,
    )
  }, [stats.attempts])
  const categoryPie = useMemo(
    () => ({
      catLetters: stats.attempts.filter((a) => a.category === 'letters').length,
      catNumbers: stats.attempts.filter((a) => a.category === 'numbers').length,
      catWords: stats.attempts.filter((a) => a.category === 'words').length,
    }),
    [stats.attempts],
  )
  const typePie = useMemo(
    () => ({
      typCamera: stats.attempts.filter((a) => a.type === 'camera').length,
      typConnect: stats.attempts.filter((a) => a.type === 'connect').length,
      typSymbol: stats.attempts.filter((a) => a.type === 'choice_symbol')
        .length,
      typGesture: stats.attempts.filter((a) => a.type === 'choice_hand').length,
    }),
    [stats.attempts],
  )

  const dayTimestamps = useMemo(
    () =>
      uniq(
        stats.attempts.map((a) => dayjs(a.timestamp).startOf('day').valueOf()),
      ),
    [stats.attempts],
  )

  const linearChartData = useMemo(() => {
    let currentDate = dayjs().startOf('day')

    const last7Days: { date: string; XP: number }[] = []
    for (let i = 0; i < 7; i++) {
      last7Days.push({ date: currentDate.toISOString(), XP: 0 })
      currentDate = currentDate.subtract(1, 'day')
    }

    const sortedResults = sortBy(
      toArray(
        groupBy(
          stats.attempts.map((a) => ({
            ...a,
            timestamp: dayjs(a.timestamp).startOf('day').valueOf(),
          })),
          'timestamp',
        ),
      ).map((a) => ({
        date: dayjs(a.at(0)?.timestamp).toISOString(),
        XP: a.filter((na) => na.success).length,
      })),
      'date',
    )

    return last7Days.reverse().map((l) => ({
      ...l,
      XP: sortedResults.find((r) => r.date === l.date)?.XP ?? l.XP,
    }))
  }, [stats.attempts])

  const daysStreak = useMemo(() => {
    // NOTE: All of these timestamp based things are completely not timezone safe and will
    // break if the person moves from one timezone to the other
    const sortedResults = sortBy(
      toArray(
        groupBy(
          stats.attempts.map((a) => ({
            ...a,
            timestamp: dayjs(a.timestamp).startOf('day').valueOf(),
          })),
          'timestamp',
        ),
      ).map((a) => ({
        date: dayjs(a.at(0)?.timestamp).toISOString(),
        XP: a.filter((na) => na.success).length,
      })),
      'date',
    )

    if (sortedResults.length <= 0) return 0
    const timestamps = sortedResults.map((d) => dayjs(d.date).unix()).reverse()

    let streak = 0
    let current = dayjs().startOf('day')

    // If we didn't do a mission today, the streak can still maybe be active so consider
    // yesterday as a starting day
    if (!timestamps.includes(current.unix())) {
      current = current.subtract(1, 'day').startOf('day')
    }

    while (timestamps.includes(current.unix())) {
      streak = streak + 1
      current = current.subtract(1, 'day').startOf('day')
    }

    return streak
  }, [stats.attempts])

  return (
    <Stack
      gap="md"
      py="xl"
      px={{ base: 'sm', sm: 'xl' }}
      w="100%"
      className={classes.container}
    >
      <Group gap="xl" justify="center" align="center">
        <UserInfo
          username={username}
          language={language}
          level={level}
          joinedTimestamp={joinedTimestamp}
        />
        <UserStats
          totalXp={stats.totalXp}
          signsLearned={signsLearned}
          daysStreak={daysStreak}
        />
      </Group>
      <Group gap="xl" justify="center" align="center">
        <UserCalendar dayTimestamps={dayTimestamps} />
        <UserLinearChart data={linearChartData} />
      </Group>
      <Group gap="xl" justify="center" align="center">
        <UserPieCharts accuracy={accuracy} {...categoryPie} {...typePie} />
      </Group>
    </Stack>
  )
}

export default ProfilePage
