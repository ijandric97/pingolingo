import BorderButton from '@/components/Button/BorderButton'
import PredictionText from '@/components/PredictionText'
import { MAX_VIDEO_HEIGHT, MAX_VIDEO_WIDTH } from '@/constants'
import { MediaPipeContext } from '@/context/MediaPipeContext'
import { TCourseSymbol } from '@/courses/types'
import useCameraQuestionLogic from '@/hooks/cameraQuestionLogic'
import { useTranslate } from '@/i18n'
import { useLessonStore } from '@/store/lessonStore'
import { TQuestionReturn } from '@/types'
import { Group, Mark, Progress, Stack, Text, Title } from '@mantine/core'
import { GestureRecognizer } from '@mediapipe/tasks-vision'
import { IconHandStop, IconTargetArrow } from '@tabler/icons-react'
import clsx from 'clsx'
import { random } from 'lodash'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'

import classes from './QuestionCamera.module.css'

type TQuestionCameraProps = {
  symbols: TCourseSymbol[]
  onComplete: (attempt: TQuestionReturn) => void
  isWord?: boolean
}

const QuestionCamera = ({
  symbols,
  onComplete,
  isWord = false,
}: TQuestionCameraProps) => {
  const { t } = useTranslate()
  const goNextStep = useLessonStore((state) => state.goNextStep)
  const isComplete = useRef(false)

  const [symbolIndex, setSymbolIndex] = useState(
    isWord ? 0 : random(0, symbols?.length ?? 0, false),
  )
  const [sameCount, setSameCount] = useState(0)
  const prevTime = useRef(Date.now())

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const modelRef = useRef<GestureRecognizer | null>(null)
  const { letterModel, numberModel } = useContext(MediaPipeContext)

  const currentSymbol = useMemo(() => {
    const newSymbol = symbols[symbolIndex]
    modelRef.current = newSymbol?.isNumber ? numberModel : letterModel

    return newSymbol
  }, [symbols, symbolIndex])

  const prediction = useCameraQuestionLogic({
    videoRef,
    canvasRef,
    modelRef,
  })

  useEffect(() => {
    setSameCount(0)
    // NOTE: For non-words, depends on the shuffling being done in the next step
    // function of the lessonStore
    setSymbolIndex(0)
    isComplete.current = false
  }, [symbols])

  useEffect(() => {
    const newTime = Date.now()
    if (newTime - prevTime.current < 100) return
    prevTime.current = newTime

    if (!isComplete.current) {
      setSameCount((prev) =>
        prediction?.gesture === currentSymbol?.name ? prev + 10 : 0,
      )
    }
  }, [currentSymbol, prediction])

  useEffect(() => {
    if (sameCount < 100) return
    setSameCount(0)

    if (!isWord) {
      onComplete({ success: true, symbolIds: [symbols[symbolIndex].id] })
      isComplete.current = true
      return
    }

    if (symbolIndex + 1 >= symbols.length) {
      onComplete({ success: true, symbolIds: symbols.map((s) => s.id) })
      isComplete.current = true
      return
    }

    setSymbolIndex((prev) => prev + 1)
  }, [symbols, symbolIndex, sameCount])

  const goNextLetter = () => {
    if (symbolIndex + 1 >= symbols.length) {
      goNextStep()
      return
    }
    setSymbolIndex((prev) => prev + 1)
  }

  return (
    <Stack
      align="center"
      py={{
        base: 'sm',
        md: 'xl',
      }}
      h="100%"
    >
      {isWord && (
        <Stack align="center">
          <Title order={1}>
            {symbols
              .slice(0, symbolIndex)
              .map((s) => s.name)
              .join(' ')}{' '}
            <Mark>
              {symbols.slice(symbolIndex, symbolIndex + 1).map((s) => s.name)}
            </Mark>{' '}
            {symbols
              .slice(symbolIndex + 1)
              .map((s) => s.name)
              .join(' ')}
          </Title>
        </Stack>
      )}
      <video autoPlay ref={videoRef} playsInline style={{ display: 'none' }} />
      <div className={classes.container}>
        <canvas
          ref={canvasRef}
          className={classes.camera}
          width={MAX_VIDEO_WIDTH}
          height={MAX_VIDEO_HEIGHT}
        />
      </div>
      <Group justify="center" align="center">
        <Progress w="100%" value={sameCount} />
        <Stack
          justify="center"
          align="center"
          className={classes.valueContainer}
          gap="xs"
        >
          <Group w="100%" px="xs" justify="space-between" align="center">
            <IconTargetArrow />
            <Text>{Math.trunc(Number(prediction?.confidence ?? 0))}%</Text>
          </Group>
          <Group w="100%" px="xs" justify="space-between" align="center">
            <IconHandStop
              className={clsx(
                prediction?.handedness !== 'Left' && classes.mirror,
              )}
            />
            <Text>
              {prediction?.handedness !== 'Left'
                ? t('CameraQuestion.Left')
                : t('CameraQuestion.Right')}
            </Text>
          </Group>
        </Stack>
        <PredictionText
          label={t('CameraQuestion.Expected')}
          value={currentSymbol?.name ?? ''}
        />
        <PredictionText
          color="red"
          label={t('CameraQuestion.Predicted')}
          value={prediction?.gesture ?? ''}
        />
      </Group>
      <Text>{t('CameraQuestion.ExpectedExamples')}</Text>
      <Group>
        {currentSymbol?.handImagePaths?.map((imgPath) => (
          <img
            key={imgPath}
            alt={currentSymbol?.name}
            src={imgPath}
            className={classes.image}
          />
        ))}
      </Group>
      <Group>
        {isWord && (
          <BorderButton mt="xs" color="gray" size="md" onClick={goNextLetter}>
            {t('CameraQuestion.SkipLetter')}
          </BorderButton>
        )}
        <BorderButton mt="xs" color="gray" size="md" onClick={goNextStep}>
          {t('CameraQuestion.Skip')}
        </BorderButton>
      </Group>
    </Stack>
  )
}

export default QuestionCamera
