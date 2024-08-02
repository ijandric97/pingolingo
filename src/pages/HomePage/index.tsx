import BorderButton from '@/components/Button/BorderButton'
import { useTranslate } from '@/i18n'
import { Anchor, Center, Container, Text, Title } from '@mantine/core'
import { useDocumentTitle } from '@mantine/hooks'
import { Link } from '@tanstack/react-router'

import classes from './HomePage.module.css'

const HomePage = () => {
  const { t } = useTranslate()
  useDocumentTitle(t('Title'))

  return (
    <div className={classes.wrapper}>
      <div className={classes.inner}>
        <Title className={classes.title}>{t('Title')}</Title>

        <Container size={640}>
          <Text size="lg" className={classes.description}>
            {t('HomePage.Description')}
          </Text>
        </Container>

        <Anchor component={Link} to="/letters" underline="never">
          <div className={classes.controls}>
            <BorderButton>{t('HomePage.Buttons.GetStarted')}</BorderButton>
          </div>
        </Anchor>
      </div>

      <Center className={classes.credits}>
        <p>
          {t('HomePage.Footer.MadeWith', {
            heart: '🧡',
          })}
          <br />
          {t('HomePage.Footer.Contribute')}
          <Anchor
            className="link"
            href="https://github.com/ijandric97/pingolingo"
          >
            {t('HomePage.Footer.GitHub')}.
          </Anchor>
        </p>
      </Center>
    </div>
  )
}
export default HomePage
