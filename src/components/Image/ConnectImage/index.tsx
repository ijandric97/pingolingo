import clsx from 'clsx'

import classes from './ConnectImage.module.css'

type TConnectImageProps = {
  id: string
  imagePath: string
  isSelected: boolean
  isCompleted: boolean
  isError: boolean
  onClick: (id: string) => void
}

const ConnectImage = ({
  id,
  imagePath,
  isSelected,
  isCompleted,
  isError,
  onClick,
}: TConnectImageProps) => {
  return (
    <img
      draggable={false}
      className={clsx(classes.image, {
        [classes.completed]: isCompleted,
        [classes.selected]: isSelected && !isError,
        [classes.error]: isSelected && isError,
      })}
      onClick={isCompleted ? undefined : () => onClick(id)}
      key={id}
      alt="Connect Image"
      src={imagePath}
    />
  )
}

export default ConnectImage
