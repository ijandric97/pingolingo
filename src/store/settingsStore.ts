import { ECourseIds } from '@/courses'
import { TTalkrLocales } from '@/i18n'
import type { TTheme } from '@/types'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface ISettingsProps {
  heartsEnabled: boolean
  username: string
  theme: TTheme
  language: TTalkrLocales
  courseId: ECourseIds
  forceFingerspellEnabled: boolean
  // Gesture Recognizer Settings
  gesturesEnabled: boolean
  syntheticModels: boolean
  mirrored: boolean
  drawGestures: boolean
  gestureDotsColor: string
  gestureDotsWidth: number
  gestureLinesColor: string
  gestureLinesWidth: number
}

const INITIAL_SETTINGS_PROPS: ISettingsProps = {
  heartsEnabled: true,
  username: 'Pingo',
  theme: 'dark',
  language: 'en',
  courseId: ECourseIds.ASL,
  forceFingerspellEnabled: false,
  // Gesture Recognizer Settings
  gesturesEnabled: true,
  syntheticModels: true,
  mirrored: false,
  drawGestures: true,
  gestureDotsColor: '#FF0000',
  gestureDotsWidth: 2,
  gestureLinesColor: '#FFFFFF',
  gestureLinesWidth: 1,
}

export interface ISettingsStore extends ISettingsProps {
  toggleHeartsEnabled: () => void
  setUsername: (username: string) => void
  setTheme: (theme: TTheme) => void
  setLanguage: (language: TTalkrLocales) => void
  setCourseId: (courseId: ECourseIds) => void
  toggleForceFingerspellEnabled: () => void
  // Gesture Recognizer Settings
  toggleGesturesEnabled: () => void
  toggleSyntheticModels: () => void
  toggleMirrored: () => void
  toggleDrawGestures: () => void
  setGestureDotsColor: (color: string) => void
  setGestureDotsWidth: (width: number) => void
  setGestureLinesColor: (color: string) => void
  setGestureLinesWidth: (width: number) => void
}

export const useSettingsStore = create<ISettingsStore>()(
  devtools(
    persist(
      (set) => ({
        ...INITIAL_SETTINGS_PROPS,
        toggleHeartsEnabled: () =>
          set(
            (state) => ({ heartsEnabled: !state.heartsEnabled }),
            undefined,
            'toggleHeartsEnabled',
          ),
        setUsername: (username) =>
          set(() => ({ username: username }), undefined, 'setUsername'),
        setTheme: (theme) => set(() => ({ theme }), undefined, 'setTheme'),
        setLanguage: (language) =>
          set(() => ({ language }), undefined, 'setLanguage'),
        setCourseId: (courseId: ECourseIds) =>
          set(() => ({ courseId }), undefined, 'setCourseId'),
        toggleForceFingerspellEnabled: () =>
          set((state) => ({
            forceFingerspellEnabled: !state.forceFingerspellEnabled,
          })),
        // Gesture Recognizer Settings
        toggleGesturesEnabled: () =>
          set(
            (state) => ({
              gesturesEnabled: !state.gesturesEnabled,
            }),
            undefined,
            'toggleGesturesEnabled',
          ),
        toggleSyntheticModels: () =>
          set(
            (state) => ({ syntheticModels: !state.syntheticModels }),
            undefined,
            'toggleSyntheticModels',
          ),
        toggleMirrored: () =>
          set(
            (state) => ({ mirrored: !state.mirrored }),
            undefined,
            'toggleDrawGestures',
          ),
        toggleDrawGestures: () =>
          set(
            (state) => ({ drawGestures: !state.drawGestures }),
            undefined,
            'toggleDrawGestures',
          ),
        setGestureDotsColor: (color: string) =>
          set(
            () => ({ gestureDotsColor: color }),
            undefined,
            'setGestureDotsColor',
          ),
        setGestureDotsWidth: (width: number) =>
          set(
            () => ({ gestureDotsWidth: width }),
            undefined,
            'setGestureDotsWidth',
          ),
        setGestureLinesColor: (color: string) =>
          set(
            () => ({ gestureLinesColor: color }),
            undefined,
            'setGestureLinesColor',
          ),
        setGestureLinesWidth: (width: number) =>
          set(
            () => ({ gestureLinesWidth: width }),
            undefined,
            'setGestureLinesWidth',
          ),
      }),
      { name: 'settingsStore' },
    ),
    {
      name: 'settingsStore',
      enabled: import.meta.env.DEV, // Vite Specific
    },
  ),
)
