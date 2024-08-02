import { MAX_VIDEO_HEIGHT, MAX_VIDEO_WIDTH } from '@/constants'
import { useSettingsStore } from '@/store/settingsStore'
import {
  DrawingUtils,
  GestureRecognizer,
  GestureRecognizerResult,
} from '@mediapipe/tasks-vision'

import { TPredictionResult } from './types'

export const drawLoadingOnCanvas = (canvas: HTMLCanvasElement | null) => {
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.save()

  // Draw black over everything
  ctx.fillStyle = 'black'
  ctx.rect(0, 0, canvas.width, canvas.height)
  ctx.fill()

  // Draw white loading text
  ctx.font = '100px Arial'
  ctx.fillStyle = 'white'
  ctx.textAlign = 'center'
  ctx.fillText('Loading', canvas.width / 2, canvas.height / 2)

  ctx.restore()
}

export const drawVideoOnCanvas = (
  canvas: HTMLCanvasElement | null,
  video: HTMLVideoElement | null,
) => {
  if (!canvas || !video) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const isMirrored = useSettingsStore.getState().mirrored
  const maxVideoWidth = isMirrored ? -MAX_VIDEO_WIDTH : MAX_VIDEO_WIDTH

  ctx.save()

  if (isMirrored) {
    ctx.scale(-1, 1)
  }

  // Draws the image from the camera (also acts as a "clear")
  ctx.drawImage(video, 0, 0, maxVideoWidth, MAX_VIDEO_HEIGHT)
  ctx.restore()
}

export const drawMediaPipeOnCanvas = (
  canvas: HTMLCanvasElement | null,
  results: GestureRecognizerResult | null,
) => {
  if (!canvas || !results || !results.landmarks.length) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const drawingUtils = new DrawingUtils(ctx)

  ctx.save()
  for (const landmarks of results.landmarks) {
    drawingUtils.drawConnectors(landmarks, GestureRecognizer.HAND_CONNECTIONS, {
      color: useSettingsStore.getState().gestureLinesColor,
      lineWidth: useSettingsStore.getState().gestureLinesWidth,
    })
    drawingUtils.drawLandmarks(landmarks, {
      color: useSettingsStore.getState().gestureDotsColor,
      lineWidth: useSettingsStore.getState().gestureDotsWidth,
    })
  }

  ctx.restore()
}

export const getPredictionResult = (
  results: GestureRecognizerResult | null,
): TPredictionResult | null => {
  if (
    !results ||
    !results.gestures ||
    results.gestures.length <= 0 ||
    !results.handedness ||
    results.handedness.length <= 0
  )
    return null

  return {
    gesture: results.gestures[0][0].categoryName,
    confidence: (results.gestures[0][0].score * 100).toFixed(2),
    handedness: results.handedness[0][0].displayName,
  }
}
