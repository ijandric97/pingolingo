import { Button, ButtonProps, PolymorphicComponentProps } from '@mantine/core'
import clsx from 'clsx'

import classes from './BorderButton.module.css'

const BorderButton = ({
  children,
  className,
  ...props
}: PolymorphicComponentProps<'button', ButtonProps>) => {
  return (
    <Button
      size="xl"
      radius="xl"
      className={clsx(classes.button, className)}
      {...props}
    >
      {children}
    </Button>
  )
}

export default BorderButton
