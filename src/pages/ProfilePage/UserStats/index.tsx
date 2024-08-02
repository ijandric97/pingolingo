import { useTranslate } from '@/i18n'
import { Group, useMantineTheme } from '@mantine/core'
import { IconBook, IconBulb, IconClock } from '@tabler/icons-react'

import UserStatPaper from './UserStatPaper'
import classes from './UserStats.module.css'

type TUserStatsProps = {
  totalXp: number
  signsLearned: number
  daysStreak: number
}

const UserStats = ({ totalXp, signsLearned, daysStreak }: TUserStatsProps) => {
  const { colors } = useMantineTheme()
  const { t } = useTranslate()

  return (
    <Group
      gap="md"
      justify="center"
      align="center"
      className={classes.container}
      grow
    >
      <UserStatPaper
        label={t('ProfilePage.TotalXp')}
        value={totalXp}
        color={colors.yellow[6]}
        icon={IconBulb}
      />
      <UserStatPaper
        label={t('ProfilePage.SignsLearned')}
        value={signsLearned}
        color={colors.lime[6]}
        icon={IconBook}
      />
      <UserStatPaper
        label={t('ProfilePage.DaysStreak')}
        value={daysStreak}
        color={colors.cyan[6]}
        icon={IconClock}
      />
    </Group>
  )
}

export default UserStats
