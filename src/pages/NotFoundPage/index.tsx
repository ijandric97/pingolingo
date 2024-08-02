import { useTranslate } from '@/i18n'
import { Button, Group, Stack, Text, Title } from '@mantine/core'
import { useDocumentTitle } from '@mantine/hooks'
import { useNavigate } from '@tanstack/react-router'

import classes from './NotFoundPage.module.css'

const NotFoundPage = () => {
  const navigate = useNavigate()
  const { t } = useTranslate()
  useDocumentTitle(`${t('Title')} - ${t('NotFoundPage.Title')}`)

  return (
    <Stack className={classes.root} gap={0}>
      <Text className={classes.label} c="dimmed">
        404
      </Text>
      <Title className={classes.title}>{t('NotFoundPage.Title')}</Title>
      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
        {t('NotFoundPage.Message')}
      </Text>
      <Group justify="center">
        <Button size="md" onClick={() => navigate({ to: '/' })}>
          {t('NotFoundPage.Button')}
        </Button>
      </Group>
    </Stack>
  )
}

export default NotFoundPage
