import {
  Box,
  DefaultMantineColor,
  Text,
  Title,
  TitleOrder,
} from '@mantine/core'

import classes from './PredictionText.module.css'

type TPredictionTextProps = {
  label: string
  value: string
  color?: DefaultMantineColor
  size?: TitleOrder
}

const PredictionText = ({
  label,
  value,
  color,
  size = 1,
}: TPredictionTextProps) => {
  return (
    <Box>
      <Text className={classes.label}>{label}</Text>
      <Box
        c={`${color}.1`}
        bg={`${color}.9`}
        className={classes.valueContainer}
      >
        <Title order={size} className={classes.value}>
          {value?.length ? value : '-'}
        </Title>
      </Box>
    </Box>
  )
}

export default PredictionText
