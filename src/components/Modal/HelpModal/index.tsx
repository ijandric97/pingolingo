import { TCourseSymbolPercentage } from '@/courses/types'
import { useTranslate } from '@/i18n'
import { useCacheStore } from '@/store/cacheStore'
import { Group, Modal, Stack, Text } from '@mantine/core'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

import classes from './HelpModal.module.css'

type THelpModalProps = {
  symbol: TCourseSymbolPercentage | null
  onClose: () => void
}

const HelpModal = ({ symbol, onClose }: THelpModalProps) => {
  const { t } = useTranslate()

  const cacheImages = useCacheStore((state) => state.cacheImages)

  const [selectedImgPath, setSelectedImgPath] = useState('')
  useEffect(() => {
    if (symbol) {
      cacheImages([symbol.imagePath, ...symbol.handImagePaths])
    }

    setSelectedImgPath(symbol?.handImagePaths.at(0) ?? '')
  }, [symbol])

  return (
    <Modal
      opened={!!symbol}
      onClose={onClose}
      title={t(
        symbol?.isNumber ? 'HelpModal.Title.Number' : 'HelpModal.Title.Letter',
        { name: symbol?.name ?? '' },
      )}
      radius={0}
      transitionProps={{ transition: 'fade', duration: 200 }}
    >
      {/* Modal content */}
      <Stack align="center">
        <img
          alt={symbol?.name}
          src={selectedImgPath}
          className={clsx(classes.image, classes.big)}
        />
        <Text>{t('HelpModal.SelectImage')}</Text>
        <Group justify="center">
          {symbol?.handImagePaths.map((imgPath) => (
            <img
              key={imgPath}
              alt={symbol.name}
              src={imgPath}
              className={clsx(
                classes.image,
                classes.small,
                imgPath === selectedImgPath && classes.selected,
              )}
              onClick={() => setSelectedImgPath(imgPath)}
            />
          ))}
        </Group>
      </Stack>
    </Modal>
  )
}

export default HelpModal
