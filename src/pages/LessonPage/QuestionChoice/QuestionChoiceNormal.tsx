import ChoiceImage from '@/components/Image/ChoiceImage'
import QuestionImage from '@/components/Image/QuestionImage'
import { Group, Stack } from '@mantine/core'
import { shuffle } from 'lodash'
import { useMemo, useState } from 'react'

import { TQuestionChoiceProps } from '.'

const QuestionChoiceNormal = ({
  symbols,
  onComplete,
  isHand = false,
}: Omit<TQuestionChoiceProps, 'isWord'>) => {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const choiceSymbols = useMemo(() => {
    setSelectedId(null)
    return shuffle(
      symbols.map(({ handImagePaths, ...s }) => ({
        ...s,
        handImagePaths: shuffle(handImagePaths),
      })),
    )
  }, [symbols])

  const correctChoiceSymbol = useMemo(
    () => shuffle(choiceSymbols)[0],
    [choiceSymbols],
  )

  const onChoice = (id: string) => {
    setSelectedId(id)
    onComplete({
      success: id === correctChoiceSymbol.id,
      symbolIds: [correctChoiceSymbol.id],
    })
  }

  const hasError = useMemo(() => {
    const retVal = selectedId !== correctChoiceSymbol.id
    return retVal
  }, [selectedId, correctChoiceSymbol.id])

  return (
    <Stack justify="space-evenly" align="center" h="100%">
      {correctChoiceSymbol && (
        <QuestionImage
          imagePath={
            !isHand
              ? correctChoiceSymbol?.imagePath
              : correctChoiceSymbol.handImagePaths[0]
          }
        />
      )}
      <Group justify="space-evenly">
        {choiceSymbols.map((s, index) => (
          <ChoiceImage
            // We are intentionally using index, we do not want updates to be keyed :)
            // because after reshuffling, there is a tiny split second where player might
            // notice that we have reshuffled, removing index confuses them and honestly
            // it does not really murder the performance so it is ok :)
            key={index}
            id={s.id}
            imagePath={!isHand ? s.handImagePaths[0] : s.imagePath}
            onClick={onChoice}
            isError={hasError}
            isSelected={s.id === selectedId}
          />
        ))}
      </Group>
    </Stack>
  )
}

export default QuestionChoiceNormal
