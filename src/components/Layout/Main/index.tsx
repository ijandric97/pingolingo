import { IMG_PATH_PINGO_BIG_FULL } from '@/constants'
import { MediaPipeContextProvider } from '@/context/MediaPipeContext'
import { Outlet } from '@tanstack/react-router'

import classes from './Main.module.css'

const Main = () => {
  return (
    <>
      <img
        alt="PingoLingo"
        src={IMG_PATH_PINGO_BIG_FULL}
        className={classes.penguin}
      />
      <img
        alt="PingoLingo"
        src={IMG_PATH_PINGO_BIG_FULL}
        className={classes.penguin2}
      />
      <MediaPipeContextProvider>
        <Outlet />
      </MediaPipeContextProvider>
    </>
  )
}

export default Main
