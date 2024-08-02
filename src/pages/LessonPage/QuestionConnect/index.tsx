import ConnectImage from '@/components/Image/ConnectImage'
import { TCourseSymbol } from '@/courses/types'
import { TQuestionReturn } from '@/types'
import { Group, Stack } from '@mantine/core'
import { shuffle } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'

type TQuestionConnectProps = {
  symbols: TCourseSymbol[]
  onComplete: (attempt: TQuestionReturn) => void
}

const QuestionConnect = ({ symbols, onComplete }: TQuestionConnectProps) => {
  const [solvedIds, setSolvedIds] = useState<string[]>([])
  const [errorCount, setErrorCount] = useState(0)
  const [leftSelectedId, setLeftSelectedId] = useState<string | null>(null)
  const [rightSelectedId, setRightSelectedId] = useState<string | null>(null)

  const leftSideSymbols: TCourseSymbol[] = useMemo(() => {
    setSolvedIds([])
    setErrorCount(0)
    setLeftSelectedId(null)
    setRightSelectedId(null)
    return shuffle(symbols)
  }, [symbols])
  const rightSideSymbols: TCourseSymbol[] = useMemo(
    () =>
      shuffle(
        symbols.map(({ handImagePaths, ...s }) => ({
          ...s,
          handImagePaths: shuffle(handImagePaths),
        })),
      ),
    [symbols],
  )

  const isError = useMemo(() => {
    const retVal =
      !!leftSelectedId &&
      !!rightSelectedId &&
      leftSelectedId !== rightSelectedId

    if (retVal) {
      setErrorCount((state) => state + 1)
    }

    return retVal
  }, [leftSelectedId, rightSelectedId])

  const leftOnClickHandler = useCallback(
    (id: string) => {
      // This is reset edge case after we just made a mistake
      if (isError) {
        setLeftSelectedId(id)
        setRightSelectedId(null)
        return
      }

      // If right side is already selected, execute verification logic :)
      if (rightSelectedId === id) {
        setLeftSelectedId(null)
        setRightSelectedId(null)
        setSolvedIds((prev) => [...prev, id])
        return
      }

      setLeftSelectedId(id !== leftSelectedId ? id : null)
    },
    [isError, leftSelectedId, rightSelectedId],
  )

  const rightOnClickHandler = useCallback(
    (id: string) => {
      if (isError) {
        setRightSelectedId(id)
        setLeftSelectedId(null)
        return
      }

      if (leftSelectedId === id) {
        setLeftSelectedId(null)
        setRightSelectedId(null)
        setSolvedIds((prev) => [...prev, id])
        return
      }

      setRightSelectedId(id !== rightSelectedId ? id : null)
    },
    [isError, leftSelectedId, rightSelectedId],
  )

  useEffect(() => {
    if (solvedIds.length === symbols.length) {
      onComplete({ success: true, symbolIds: solvedIds })
    }
  }, [solvedIds, symbols])

  useEffect(() => {
    if (errorCount > 3) {
      onComplete({ success: false, symbolIds: symbols.map((s) => s.id) })
    }
  }, [errorCount])

  return (
    <Group justify="space-evenly" h="100%">
      <Stack>
        {leftSideSymbols.map((symbol) => (
          <ConnectImage
            key={symbol.id}
            id={symbol.id}
            imagePath={symbol.imagePath}
            onClick={leftOnClickHandler}
            isSelected={symbol.id === leftSelectedId}
            isCompleted={solvedIds.includes(symbol.id)}
            isError={isError}
          />
        ))}
      </Stack>
      <Stack>
        {rightSideSymbols.map((symbol) => (
          <ConnectImage
            key={symbol.id}
            id={symbol.id}
            imagePath={symbol.handImagePaths[0]}
            isSelected={symbol.id === rightSelectedId}
            onClick={rightOnClickHandler}
            isCompleted={solvedIds.includes(symbol.id)}
            isError={isError}
          />
        ))}
      </Stack>
    </Group>
  )
}

export default QuestionConnect
