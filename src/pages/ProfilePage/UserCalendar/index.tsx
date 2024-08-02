import { useTranslate } from '@/i18n'
import { useSettingsStore } from '@/store/settingsStore'
import { Stack, Title } from '@mantine/core'
import { Calendar } from '@mantine/dates'
import clsx from 'clsx'
import dayjs from 'dayjs'

import classes from './UserCalendar.module.css'

type TUserCalendarProps = {
  dayTimestamps: number[]
}

const UserCalendar = ({ dayTimestamps }: TUserCalendarProps) => {
  const { t } = useTranslate()
  const locale = useSettingsStore((state) => state.language)

  return (
    <Stack className={classes.container}>
      <Title order={3}>{t('ProfilePage.Calendar')}</Title>
      <Calendar
        static
        locale={locale ?? 'en'}
        classNames={{
          levelsGroup: classes.levelsGroup,
        }}
        renderDay={(date) => {
          const parsedDate = dayjs(date)

          return (
            <div
              className={clsx(
                dayTimestamps.includes(parsedDate.valueOf()) &&
                  classes.indicator,
              )}
            >
              {parsedDate.date()}
            </div>
          )
        }}
      />
    </Stack>
  )
}

export default UserCalendar
