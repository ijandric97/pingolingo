import {
  IMG_PATH_PINGO_BODY,
  IMG_PATH_PINGO_HEAD,
  IMG_PATH_PINGO_LEFT_LEG,
  IMG_PATH_PINGO_LEFT_WING,
  IMG_PATH_PINGO_RIGHT_LEG,
  IMG_PATH_PINGO_RIGHT_WING,
} from '@/constants'
import clsx from 'clsx'

import classes from './AnimatedPingo.module.css'

type TAnimatedPingoProps = {
  isSad?: boolean
}

const AnimatedPingo = ({ isSad = false }: TAnimatedPingoProps) => {
  return (
    <div className={clsx(classes.container, isSad && classes.sad)}>
      <img
        alt="PingoLingo"
        src={IMG_PATH_PINGO_BODY}
        className={clsx(classes.image, classes.body)}
      />
      <img
        alt="PingoLingo"
        src={IMG_PATH_PINGO_HEAD}
        className={clsx(classes.image, classes.positioned, classes.head)}
      />
      <img
        alt="PingoLingo"
        src={IMG_PATH_PINGO_LEFT_WING}
        className={clsx(
          classes.image,
          classes.positioned,
          classes.wing,
          classes.leftWing,
          isSad && classes.sad,
        )}
      />
      <img
        alt="PingoLingo"
        src={IMG_PATH_PINGO_RIGHT_WING}
        className={clsx(
          classes.image,
          classes.positioned,
          classes.wing,
          classes.rightWing,
          isSad && classes.sad,
        )}
      />
      <img
        alt="PingoLingo"
        src={IMG_PATH_PINGO_LEFT_LEG}
        className={clsx(classes.image, classes.positioned, classes.leg)}
      />
      <img
        alt="PingoLingo"
        src={IMG_PATH_PINGO_RIGHT_LEG}
        className={clsx(classes.image, classes.positioned, classes.leg)}
      />
    </div>
  )
}

export default AnimatedPingo
