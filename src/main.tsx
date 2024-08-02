import { TalkrRoot } from '@/i18n'
import '@mantine/charts/styles.css'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import 'dayjs/locale/de'
import 'dayjs/locale/en'
import 'dayjs/locale/hr'
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TalkrRoot>
      <MantineProvider
        defaultColorScheme="dark"
        theme={{
          fontFamily: 'Inter',
          headings: {
            fontFamily: 'Montserrat',
          },
          primaryColor: 'yellow',
        }}
      >
        <App />
      </MantineProvider>
    </TalkrRoot>
  </React.StrictMode>,
)
