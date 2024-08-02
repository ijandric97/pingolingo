import { useMantineColorScheme } from '@mantine/core'
import '@mantine/core/styles.css'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { useEffect } from 'react'

import { useTranslate } from './i18n'
import { routeTree } from './routeTree.gen'
import { useSettingsStore } from './store/settingsStore'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Only exists to track Zustand settings store changes and set correct Theme
// setting in the Mantine and correct locale in Talkr.
const App = () => {
  // Tracking theme in store and setting mantine to it
  const theme = useSettingsStore((state) => state.theme)
  const { setColorScheme } = useMantineColorScheme()
  useEffect(() => {
    setColorScheme(theme)
  }, [theme])

  // Tracking language in store and setting talkr to it
  const language = useSettingsStore((state) => state.language)
  const { setLocale } = useTranslate()
  useEffect(() => {
    setLocale(language)
    dayjs.locale(language)
  }, [language])

  return <RouterProvider router={router} />
}

export default App
