import { TTalkrKey, useTranslate } from '@/i18n'
import { PieChartCell } from '@mantine/charts'
import { ColorSwatch, Group, Stack, Text, useMantineTheme } from '@mantine/core'
import { get } from 'lodash'

type TUserPieChartLegendProps = {
  data: PieChartCell[]
}

const UserPieChartLegend = ({ data }: TUserPieChartLegendProps) => {
  const { colors } = useMantineTheme()
  const { t } = useTranslate()

  return (
    <Stack gap="xs">
      {data.map((v) => (
        <Group key={v.name}>
          <ColorSwatch
            size={12}
            color={get(colors, v.color, '') as string}
            withShadow={false}
          />
          <Text size="sm">{t(v.name as TTalkrKey)}</Text>
        </Group>
      ))}
    </Stack>
  )
}

export default UserPieChartLegend
