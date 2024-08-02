import { useTranslate } from '@/i18n'
import { Anchor, UnstyledButton } from '@mantine/core'
import { Link, useRouterState } from '@tanstack/react-router'
import clsx from 'clsx'

import classes from './NavigationLinks.module.css'

export const NavigationLinks = () => {
  const { t } = useTranslate()
  const {
    location: { pathname },
  } = useRouterState()

  return (
    <>
      <Anchor
        className={clsx({
          [classes.link]: pathname !== '/',
        })}
        component={Link}
        to="/"
        underline="never"
      >
        <UnstyledButton className={classes.control}>
          {t('Navbar.Links.Home')}
        </UnstyledButton>
      </Anchor>
      <Anchor
        className={clsx({
          [classes.link]: !pathname.toLocaleLowerCase().includes('/letters'),
        })}
        component={Link}
        to="/letters"
        underline="never"
      >
        <UnstyledButton className={classes.control}>
          {t('Navbar.Links.Letters')}
        </UnstyledButton>
      </Anchor>
      <Anchor
        className={clsx({
          [classes.link]: !pathname.toLocaleLowerCase().includes('/numbers'),
        })}
        component={Link}
        to="/numbers"
        underline="never"
      >
        <UnstyledButton className={classes.control}>
          {t('Navbar.Links.Numbers')}
        </UnstyledButton>
      </Anchor>
    </>
  )
}
