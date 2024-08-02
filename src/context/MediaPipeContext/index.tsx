import { COURSES } from '@/courses'
import { useSettingsStore } from '@/store/settingsStore'
import { FilesetResolver, GestureRecognizer } from '@mediapipe/tasks-vision'
import { createContext, useEffect, useMemo, useState } from 'react'

interface IMediaPipeContext {
  letterModel: GestureRecognizer | null
  numberModel: GestureRecognizer | null
}

export const MediaPipeContext = createContext<IMediaPipeContext>(
  {} as IMediaPipeContext,
)

type TMediaPipeContextProviderProps = {
  children: React.ReactNode
}

export const MediaPipeContextProvider = ({
  children,
}: TMediaPipeContextProviderProps) => {
  const courseId = useSettingsStore((state) => state.courseId)
  const syntheticModels = useSettingsStore((state) => state.syntheticModels)

  //#region VISION WASM
  const [visionWasm, setVisionWasm] = useState<Awaited<
    ReturnType<(typeof FilesetResolver)['forVisionTasks']>
  > | null>(null)
  useEffect(() => {
    // Load Vison WebAssembly Package
    FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.12/wasm',
    ).then((value) => setVisionWasm(value))
  }, [])
  //#endregion

  //#region LETTER MODEL
  const [letterModel, setLetterModel] = useState<GestureRecognizer | null>(null)
  const letterModelPath = useMemo(() => {
    const models = (COURSES.find((c) => c.id === courseId)?.models ?? [])
      .filter((m) => !m.isNumber)
      .filter((m) => (syntheticModels ? m.isSynthetic : !m.isSynthetic))

    return models?.at(0)?.modelPath ?? null
  }, [courseId, syntheticModels])

  useEffect(() => {
    if (!visionWasm || !letterModelPath) return

    GestureRecognizer.createFromOptions(visionWasm, {
      baseOptions: {
        modelAssetPath: letterModelPath,
        delegate: 'GPU',
      },
      runningMode: 'VIDEO',
    }).then((value) => setLetterModel(value))
  }, [visionWasm, letterModelPath])
  //#endregion

  //#region NUMBER MODEL
  const [numberModel, setNumberModel] = useState<GestureRecognizer | null>(null)
  const numberModelPath = useMemo(() => {
    const models = (COURSES.find((c) => c.id === courseId)?.models ?? [])
      .filter((m) => m.isNumber)
      .filter((m) => (syntheticModels ? m.isSynthetic : !m.isSynthetic))

    return models.find((m) => m.isNumber)?.modelPath ?? null
  }, [courseId, syntheticModels])

  useEffect(() => {
    if (!visionWasm || !numberModelPath) return

    GestureRecognizer.createFromOptions(visionWasm, {
      baseOptions: {
        modelAssetPath: numberModelPath,
        delegate: 'GPU',
      },
      runningMode: 'VIDEO',
    }).then((value) => setNumberModel(value))
  }, [visionWasm, numberModelPath])
  //#region

  return (
    <MediaPipeContext.Provider
      value={{
        letterModel,
        numberModel,
      }}
    >
      {children}
    </MediaPipeContext.Provider>
  )
}
