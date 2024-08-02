import { useTranslate } from '@/i18n'
import { LineChart } from '@mantine/charts'
import { Stack, Title } from '@mantine/core'
import dayjs from 'dayjs'
import { capitalize } from 'lodash'
import { useCallback, useMemo } from 'react'

import classes from './UserLinearChart.module.css'

type TUserLinearChartEntry = {
  date: string
  XP: number
}

type TUserLinearChartProps = {
  data: TUserLinearChartEntry[]
}

const UserLinearChart = ({ data }: TUserLinearChartProps) => {
  const { t } = useTranslate()

  const formattedData = useMemo(
    () =>
      data.map((d) => ({
        ...d,
        date: capitalize(dayjs(d.date).format('YYYY-MM-DD')),
      })),
    [data],
  )

  const formatXAxisDates = useCallback(
    (t: number) => capitalize(dayjs(t).format('ddd')),
    [],
  )

  return (
    <Stack className={classes.container}>
      <Title order={3}>{t('ProfilePage.Last7Days')}</Title>
      <LineChart
        className={classes.chart}
        h={300}
        tickLine="xy"
        gridAxis="xy"
        curveType="monotone"
        data={formattedData}
        dataKey="date"
        series={[{ name: 'XP', color: 'yellow.6' }]}
        xAxisProps={{ tickFormatter: formatXAxisDates }}
        valueFormatter={(value) => value.toFixed(0)}
        connectNulls={false}
      />
    </Stack>
  )
}

export default UserLinearChart
