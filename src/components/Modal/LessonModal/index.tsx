import BorderButton from '@/components/Button/BorderButton'
import { useTranslate } from '@/i18n'
import { TModalState } from '@/types'
import { Box, Modal, Stack, Text } from '@mantine/core'
import clsx from 'clsx'
import { useMemo } from 'react'

import classes from './LessonModal.module.css'

type TLessonModalProps = {
  isOpen: boolean
  onClose: () => void
  modalState?: TModalState
  description?: string
}

const LessonModal = ({
  isOpen,
  onClose,
  modalState,
  description,
}: TLessonModalProps) => {
  const { t } = useTranslate()

  const [isSuccess, isError] = useMemo(
    () => [modalState === 'success', modalState === 'error'],
    [modalState],
  )

  return (
    <Modal
      transitionProps={{ transition: 'fade-up' }}
      size="100vw"
      opened={isOpen}
      onClose={onClose}
      withCloseButton={false}
      classNames={{
        inner: classes.inner,
        content: classes.content,
        body: clsx(classes.body, {
          [classes.success]: isSuccess,
          [classes.error]: isError,
        }),
      }}
      overlayProps={{
        backgroundOpacity: 0.5,
        blur: 5,
      }}
    >
      <Box className={classes.container}>
        <Stack className={classes.stack}>
          <Text className={classes.title}>
            {t(
              isSuccess
                ? 'LessonModal.Correct'
                : isError
                  ? 'LessonModal.Incorrect'
                  : '',
            )}
          </Text>
          {description && (
            <Text className={classes.description}>{description}</Text>
          )}
          <BorderButton
            color={isSuccess ? 'green' : isError ? 'red' : 'gray'}
            size="lg"
            w="100%"
            onClick={onClose}
            mt="md"
          >
            {t('LessonModal.Continue')}
          </BorderButton>
        </Stack>
      </Box>
    </Modal>
  )
}

export default LessonModal
