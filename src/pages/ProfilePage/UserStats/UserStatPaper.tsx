import {
  Center,
  Group,
  NumberFormatter,
  Paper,
  RingProgress,
  Text,
  rem,
} from '@mantine/core'
import { Icon, IconProps } from '@tabler/icons-react'

import classes from './UserStats.module.css'

type TUserStatPaperProps = {
  label: string
  value: number
  color: string
  icon: (
    props: Omit<IconProps, 'ref'> & React.RefAttributes<Icon>,
  ) => React.ReactNode
}

const UserStatPaper = ({
  label,
  value,
  color,
  icon: Icon,
}: TUserStatPaperProps) => {
  return (
    <Paper withBorder radius="md" p="xs" key={label} className={classes.item}>
      <Group>
        <RingProgress
          size={80}
          roundCaps
          thickness={8}
          sections={[{ value: 100, color: color }]}
          label={
            <Center>
              <Icon
                style={{ width: rem(20), height: rem(20) }}
                stroke={1.5}
                color={color}
              />
            </Center>
          }
        />

        <div>
          <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
            {label}
          </Text>
          <Text fw={700} size="xl">
            <NumberFormatter value={value} thousandSeparator />
          </Text>
        </div>
      </Group>
    </Paper>
  )
}

export default UserStatPaper
