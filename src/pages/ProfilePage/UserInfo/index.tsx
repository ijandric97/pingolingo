import { TTalkrLocales, useTranslate } from '@/i18n'
import { Avatar, Group, Stack, Text } from '@mantine/core'
import { useMemo } from 'react'

import classes from './UserInfo.module.css'

type TUserInfoProps = {
  level: number
  username: string
  language: TTalkrLocales
  joinedTimestamp: number
  imageSrc?: string
}

const UserInfo = ({
  level,
  username,
  language,
  joinedTimestamp,
  imageSrc = '/images/PingoLogo.png',
}: TUserInfoProps) => {
  const { t } = useTranslate()

  const joinedDate = useMemo(() => {
    return joinedTimestamp ? new Date(joinedTimestamp).toLocaleDateString() : ''
  }, [joinedTimestamp])

  return (
    <Group wrap="nowrap" className={classes.container}>
      <Avatar
        className={classes.avatar}
        src={imageSrc}
        size={128}
        radius="md"
      />
      <Stack gap={2}>
        <Text fz="sm" tt="uppercase" fw={700} c="orange">
          {t('ProfilePage.Level', { level })}
        </Text>
        <Text fz="xl" className={classes.name}>
          {username}
        </Text>
        <Text className="flagFix" fz="md">
          {t(`SettingsAside.Language.Languages.${language}`)}
        </Text>
        {joinedDate && (
          <Text fz="md">{t('ProfilePage.Joined', { date: joinedDate })}</Text>
        )}
      </Stack>
    </Group>
  )
}

export default UserInfo
