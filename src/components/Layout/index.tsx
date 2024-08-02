import { AppShell } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import Header from './Header'
import classes from './Layout.module.css'
import Main from './Main'
import { NavigationLinks } from './NavigationLinks'
import SettingsAside from './SettingsAside'

const Layout = () => {
  const [navbarOpen, { toggle: toggleNavbar }] = useDisclosure()
  const [openedSettings, { toggle: toggleSettings }] = useDisclosure()

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { desktop: true, mobile: !navbarOpen },
      }}
      aside={{
        width: 300,
        breakpoint: 'md',
        collapsed: { desktop: !openedSettings, mobile: !openedSettings },
      }}
    >
      <AppShell.Header>
        <Header
          navbarOpen={navbarOpen}
          onNavbarOpen={toggleNavbar}
          settingsOpen={false}
          onSettingsOpen={toggleSettings}
        />
      </AppShell.Header>
      <AppShell.Navbar py="md" px={4}>
        <NavigationLinks />
      </AppShell.Navbar>
      <AppShell.Main className={classes.main}>
        <Main />
      </AppShell.Main>
      <AppShell.Aside p="md">
        <SettingsAside toggleOpen={toggleSettings} />
      </AppShell.Aside>
    </AppShell>
  )
}

export default Layout
