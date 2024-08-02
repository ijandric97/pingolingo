import clsx from 'clsx'

import classes from './ChoiceImage.module.css'

type TChoiceImageProps = {
  id: string
  imagePath: string
  isSelected: boolean
  isError: boolean
  onClick: (id: string) => void
}

const ChoiceImage = ({
  id,
  imagePath,
  isSelected,
  isError,
  onClick,
}: TChoiceImageProps) => {
  return (
    <img
      draggable={false}
      className={clsx(classes.image, {
        [classes.selected]: isSelected,
        [classes.error]: isSelected && isError,
      })}
      alt="Choice Image"
      src={imagePath}
      onClick={!isSelected ? () => onClick(id) : undefined}
    />
  )
}

export default ChoiceImage
