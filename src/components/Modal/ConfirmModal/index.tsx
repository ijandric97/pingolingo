import { useTranslate } from '@/i18n'
import { ButtonProps, Modal, Stack, Text } from '@mantine/core'

import BorderButton from '../../Button/BorderButton'
import classes from './ConfirmModal.module.css'

type TConfirmModalProps = {
  isOpen: boolean
  title: string
  description?: string
  onConfirm: () => void
  onCancel: () => void
  confirmButtonLabel?: string
  confirmButtonColor?: ButtonProps['color']
  cancelButtonLabel?: string
  cancelButtonColor?: ButtonProps['color']
}

const ConfirmModal = ({
  isOpen,
  title,
  description,
  onConfirm,
  onCancel,
  confirmButtonLabel,
  confirmButtonColor,
  cancelButtonLabel,
  cancelButtonColor,
}: TConfirmModalProps) => {
  const { t } = useTranslate()

  return (
    <Modal
      centered
      closeOnClickOutside
      closeOnEscape
      opened={isOpen}
      onClose={onCancel}
      title={title}
      classNames={{
        header: classes.header,
        title: classes.title,
        body: classes.body,
      }}
    >
      <Stack gap="lg">
        {description && <Text>{description}</Text>}
        <Stack>
          <BorderButton
            size="md"
            color={confirmButtonColor ?? 'green'}
            onClick={onConfirm}
          >
            {confirmButtonLabel ?? t('ConfirmModal.Confirm')}
          </BorderButton>
          <BorderButton
            size="md"
            className={classes.secondary}
            color={cancelButtonColor ?? 'red'}
            onClick={onCancel}
          >
            {cancelButtonLabel ?? t('ConfirmModal.Cancel')}
          </BorderButton>
        </Stack>
      </Stack>
    </Modal>
  )
}

export default ConfirmModal
