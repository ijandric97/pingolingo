import ConnectImage from '@/components/Image/ConnectImage'
import { useTranslate } from '@/i18n'
import { Group, Mark, Stack, Text, Title } from '@mantine/core'
import { shuffle } from 'lodash'
import { useEffect, useMemo, useState } from 'react'

import { TQuestionChoiceProps } from '.'

const QuestionChoiceWord = ({
  symbols,
  onComplete,
}: Omit<TQuestionChoiceProps, 'isHand' | 'isWord'>) => {
  const { t } = useTranslate()

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [solvedIds, setSolvedIds] = useState<string[]>([])
  const [errorCount, setErrorCount] = useState(0)

  const choiceSymbols = useMemo(() => {
    setSelectedId(null)
    setCurrentIndex(0)
    setSolvedIds([])
    setErrorCount(0)
    return shuffle(
      symbols.map(({ handImagePaths, ...s }) => ({
        ...s,
        handImagePaths: shuffle(handImagePaths),
      })),
    )
  }, [symbols])

  const onChoice = (id: string) => {
    const isGood = id?.split('.')?.[1] === symbols[currentIndex].id
    if (isGood) {
      setSolvedIds((s) => [...s, id])
      setSelectedId(null)

      if (currentIndex + 1 < symbols.length) {
        setCurrentIndex((p) => p + 1)
      }
      return
    }

    setSelectedId(id)
  }

  const hasError = useMemo(() => {
    const retVal =
      !!selectedId && selectedId?.split('.')?.[1] !== symbols[currentIndex].id

    if (retVal) {
      setErrorCount((p) => p + 1)
    }

    return retVal
  }, [selectedId, symbols, currentIndex])

  useEffect(() => {
    if (solvedIds.length === symbols.length) {
      onComplete({ success: true, symbolIds: symbols.map((s) => s.id) })
    }
  }, [solvedIds, symbols])

  useEffect(() => {
    if (errorCount > 3) {
      onComplete({ success: false, symbolIds: [] })
    }
  }, [errorCount])

  return (
    <Stack justify="space-evenly" align="center" h="100%">
      <Stack align="center">
        <Text ta="center">{t('QuestionChoice.FingerspellHelp')}</Text>
        <Title order={1}>
          {symbols
            .slice(0, currentIndex)
            .map((s) => s.name)
            .join(' ')}{' '}
          <Mark>
            {symbols.slice(currentIndex, currentIndex + 1).map((s) => s.name)}
          </Mark>{' '}
          {symbols
            .slice(currentIndex + 1)
            .map((s) => s.name)
            .join(' ')}
        </Title>
      </Stack>
      <Group justify="space-evenly">
        {choiceSymbols.map((s, index) => {
          const id = `${index}.${s.id}`
          return (
            <ConnectImage
              key={index}
              id={id}
              imagePath={s.handImagePaths[0]}
              isSelected={id === selectedId}
              isCompleted={solvedIds.includes(id)}
              isError={hasError}
              onClick={onChoice}
            />
          )
        })}
      </Group>
    </Stack>
  )
}

export default QuestionChoiceWord
