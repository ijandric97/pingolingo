import {
  Button,
  ButtonProps,
  PolymorphicComponentProps,
  Progress,
  rgba,
  useMantineTheme,
} from '@mantine/core'

import classes from './ProgressButton.module.css'

type TProgressButtonProps = {
  value?: number
} & PolymorphicComponentProps<'button', ButtonProps>

const ProgressButton = ({
  value = 0,
  color,
  children,
  radius,
  ...rest
}: TProgressButtonProps) => {
  const { colors } = useMantineTheme()

  return (
    <Button
      variant="default"
      color={color}
      radius={radius}
      style={{
        borderColor: color,
      }}
      {...rest}
    >
      <div className={classes.label}>{children}</div>
      {value !== 0 && (
        <Progress
          value={value}
          className={classes.progress}
          color={rgba(color ? colors[color][6] : 'transparent', 0.35)}
          radius={radius}
        />
      )}
    </Button>
  )
}

export default ProgressButton
