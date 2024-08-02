import { IMG_PATH_FAVICON } from '@/constants'
import { useTranslate } from '@/i18n'
import { ActionIcon, Anchor, Burger, Group, Image, Title } from '@mantine/core'
import { IconSettings, IconSettingsOff } from '@tabler/icons-react'
import { Link, useRouterState } from '@tanstack/react-router'
import { useMemo } from 'react'

import { NavigationLinks } from '../NavigationLinks'
import classes from './Header.module.css'
import LessonProgress from './LessonProgress'

type THeaderProps = {
  navbarOpen: boolean
  onNavbarOpen: () => void
  settingsOpen: boolean
  onSettingsOpen: () => void
}

const Header = ({
  navbarOpen,
  onNavbarOpen,
  settingsOpen,
  onSettingsOpen,
}: THeaderProps) => {
  const { t } = useTranslate()

  const {
    location: { pathname },
  } = useRouterState()

  const isLesson = useMemo(() => {
    if (navbarOpen) {
      onNavbarOpen()
    }
    return pathname.toLocaleLowerCase().includes('/lesson')
  }, [pathname])

  return (
    <Group justify="space-between" h="100%" px="md" w="100vw">
      {isLesson ? (
        <LessonProgress />
      ) : (
        <>
          <Burger
            opened={navbarOpen}
            onClick={onNavbarOpen}
            hiddenFrom="sm"
            size="sm"
          />
          <Anchor
            component={Link}
            to="/"
            underline="never"
            className={classes.logoContainer}
          >
            <Group>
              <Image
                className={classes.logo}
                src={IMG_PATH_FAVICON}
                alt={t('Title')}
              />
              <Title textWrap="nowrap" size="h3">
                {t('Title')}
              </Title>
            </Group>
          </Anchor>
        </>
      )}
      <Group>
        {!isLesson && (
          <Group ml="xl" gap={0} visibleFrom="sm">
            <NavigationLinks />
          </Group>
        )}
        <ActionIcon
          className={classes.settingsButton}
          variant="transparent"
          size="sm"
          onClick={onSettingsOpen}
        >
          {settingsOpen ? <IconSettingsOff /> : <IconSettings />}
        </ActionIcon>
      </Group>
    </Group>
  )
}

export default Header
