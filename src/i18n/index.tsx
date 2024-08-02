import { Autocomplete, TParams, Talkr, tr, useT } from 'talkr'

import de from './de.json'
import en from './en.json'
import hr from './hr.json'

export const translations = { hr, en, de } as const
export type TTalkrLocales = keyof typeof translations
export type TTalkrKey = Autocomplete<(typeof translations)[TTalkrLocales]>

export const useTranslate = () => {
  const { locale, languages, defaultLanguage, setLocale } = useT()
  return {
    t: (key: TTalkrKey | '', params?: TParams) =>
      key ? tr({ locale, languages, defaultLanguage }, key, params) : '',
    locale,
    languages,
    defaultLanguage,
    setLocale,
  }
}

export const TalkrRoot = ({ children }: { children: React.ReactNode }) => (
  <Talkr languages={{ de, en, hr }} defaultLanguage={'en'}>
    {children}
  </Talkr>
)
