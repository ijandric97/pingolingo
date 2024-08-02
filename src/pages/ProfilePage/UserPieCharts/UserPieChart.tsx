import { PieChart, PieChartCell } from '@mantine/charts'
import { Group, Stack, Title } from '@mantine/core'

import UserPieChartLegend from './UserPieChartLegend'
import classes from './UserPieCharts.module.css'

type TUserPieChartProps = {
  title: string
  data: PieChartCell[]
  isPercentage?: boolean
}

const UserPieChart = ({
  title,
  data,
  isPercentage = true,
}: TUserPieChartProps) => {
  return (
    <Stack className={classes.itemContainer}>
      <Title order={3}>{title}</Title>
      <Group className={classes.item}>
        <PieChart
          withLabels
          withLabelsLine
          labelsType={isPercentage ? 'percent' : 'value'}
          labelsPosition="inside"
          strokeWidth={2}
          data={data}
        />
        <UserPieChartLegend data={data} />
      </Group>
    </Stack>
  )
}

export default UserPieChart
