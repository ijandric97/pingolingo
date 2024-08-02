import {
  IMG_PATH_FAVICON,
  IMG_PATH_PINGO_BIG_FULL,
  IMG_PATH_PINGO_BODY,
  IMG_PATH_PINGO_HEAD,
  IMG_PATH_PINGO_LEFT_LEG,
  IMG_PATH_PINGO_LEFT_WING,
  IMG_PATH_PINGO_RIGHT_LEG,
  IMG_PATH_PINGO_RIGHT_WING,
} from '@/constants'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface ICacheProps {
  isCaching: boolean
  cache: Map<string, HTMLImageElement>
}

const INITIAL_CACHE_PROPS: ICacheProps = {
  isCaching: false,
  cache: new Map(),
}

export interface ICacheStore extends ICacheProps {
  cacheImages: (srcArray: string[]) => Promise<void>
}

export const useCacheStore = create<ICacheStore>()(
  devtools(
    (set, get) => ({
      ...INITIAL_CACHE_PROPS,
      cacheImages: async (srcArray) => {
        set({ isCaching: true }, undefined, 'cacheImages -> start')

        const promises = srcArray
          .filter((src) => !get().cache.has(src))
          .map(
            (src) =>
              new Promise<void>((resolve, reject) => {
                const img = new Image()
                img.src = src
                img.onload = () => {
                  set(
                    (prev) => ({
                      cache: new Map(prev.cache).set(src, img),
                    }),
                    undefined,
                    `cacheImages ${src}`,
                  )
                  resolve()
                }
                img.onerror = () => {
                  console.error(`Promise rejected: caching image src='${src}'`)
                  reject()
                }
              }),
          )

        await Promise.all(promises)

        set({ isCaching: false }, undefined, 'cacheImages->end')
      },
    }),
    {
      name: 'cacheStore',
      enabled: import.meta.env.DEV, // Vite Specific
    },
  ),
)

// These are the default images, they should always be cached :)
useCacheStore
  .getState()
  .cacheImages([
    IMG_PATH_FAVICON,
    IMG_PATH_PINGO_BIG_FULL,
    IMG_PATH_PINGO_BODY,
    IMG_PATH_PINGO_HEAD,
    IMG_PATH_PINGO_LEFT_WING,
    IMG_PATH_PINGO_RIGHT_WING,
    IMG_PATH_PINGO_LEFT_LEG,
    IMG_PATH_PINGO_RIGHT_LEG,
  ])
