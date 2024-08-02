import { useSettingsStore } from '@/store/settingsStore'
import {
  GestureRecognizer,
  GestureRecognizerResult,
} from '@mediapipe/tasks-vision'
import { useCallback, useEffect, useRef, useState } from 'react'

import {
  drawLoadingOnCanvas,
  drawMediaPipeOnCanvas,
  drawVideoOnCanvas,
  getPredictionResult,
} from './helpers'
import { TPredictionResult } from './types'

type TUseCameraQuestionLogicProps = {
  videoRef: React.MutableRefObject<HTMLVideoElement | null>
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>
  modelRef: React.MutableRefObject<GestureRecognizer | null>
}

const useCameraQuestionLogic = ({
  videoRef,
  canvasRef,
  modelRef,
}: TUseCameraQuestionLogicProps) => {
  const requestAnimationRef = useRef<number>(-1)
  const lastVideoTimeRef = useRef<number>(-1)
  const resultsRef = useRef<GestureRecognizerResult | null>(null)

  const [prediction, setPrediction] = useState<TPredictionResult | null>(null)

  const renderingLoop = useCallback(() => {
    const nowInMs = Date.now()

    // STOP The Rendering Loop if there is no canvas to render to :)
    if (!canvasRef.current) {
      window.cancelAnimationFrame(requestAnimationRef.current)
      return
    }

    if (canvasRef.current && videoRef.current && modelRef.current) {
      drawVideoOnCanvas(canvasRef.current, videoRef.current)

      // Run prediction
      if (videoRef.current.currentTime !== lastVideoTimeRef.current) {
        lastVideoTimeRef.current = videoRef.current.currentTime
        resultsRef.current = modelRef.current.recognizeForVideo(
          canvasRef.current,
          nowInMs,
        )

        setPrediction(getPredictionResult(resultsRef.current))
      }

      if (useSettingsStore.getState().drawGestures) {
        drawMediaPipeOnCanvas(canvasRef.current, resultsRef.current)
      }
    }

    requestAnimationRef.current = window.requestAnimationFrame(renderingLoop)
  }, [])

  useEffect(() => {
    drawLoadingOnCanvas(canvasRef.current)

    const isPortrait = screen.availHeight > screen.availWidth

    // Start the camera on mount and add event listener to the video
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: isPortrait ? 720 : 1280,
          height: isPortrait ? 1280 : 720,
        },
        audio: false,
      })
      .then((stream) => {
        if (!videoRef.current) return

        videoRef.current.autoplay = true // Sanity check
        videoRef.current.srcObject = stream
        videoRef.current.addEventListener('loadeddata', renderingLoop)
      })

    return () => {
      // Stop the event listener then stop the camera
      if (videoRef.current) {
        videoRef.current.srcObject = null
        videoRef.current.removeEventListener('loadeddata', renderingLoop)
      }
      window.cancelAnimationFrame(requestAnimationRef.current)
    }
  }, [renderingLoop])

  return prediction
}

export default useCameraQuestionLogic
