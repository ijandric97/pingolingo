import BorderButton from '@/components/Button/BorderButton'
import ConfirmModal from '@/components/Modal/ConfirmModal'
import { MAX_GESTURE_DRAW_WIDTH, MIN_GESTURE_DRAW_WIDTH } from '@/constants'
import { TTalkrKey, TTalkrLocales, translations, useTranslate } from '@/i18n'
import { useSettingsStore } from '@/store/settingsStore'
import { useStatisticsStore } from '@/store/statisticsStore'
import {
  Checkbox,
  ColorInput,
  Divider,
  NumberInput,
  ScrollArea,
  Select,
  Stack,
  Switch,
  Text,
  TextInput,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Link } from '@tanstack/react-router'
import clsx from 'clsx'
import { ChangeEvent, useCallback, useMemo } from 'react'

import classes from './SettingsAside.module.css'

type TSettingsAsideProps = {
  toggleOpen: () => void
}

const SettingsAside = ({ toggleOpen }: TSettingsAsideProps) => {
  const { t, locale } = useTranslate()
  const settings = useSettingsStore()
  const resetStatistics = useStatisticsStore((state) => state.resetStatistics)
  const exportStatistics = useStatisticsStore((state) => state.exportStatistics)
  const importStatistics = useStatisticsStore((state) => state.importStatistics)

  // Theme State and Handler
  const isDarkMode = useMemo(() => settings.theme === 'dark', [settings.theme])
  const handleThemeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const isDarkMode = event.target.checked
      settings.setTheme(isDarkMode ? 'dark' : 'light')
    },
    [],
  )

  // Language State and Handler
  const languageOptions = useMemo(
    () =>
      Object.keys(translations).map((language) => ({
        value: language,
        label: t(`SettingsAside.Language.Languages.${language}` as TTalkrKey),
      })),
    [locale, settings.language],
  )
  const handleLanguageChange = useCallback((value: string | null) => {
    settings.setLanguage(
      value && Object.keys(translations).includes(value)
        ? (value as TTalkrLocales)
        : 'en',
    )
  }, [])

  // Reset Progress State and Handler
  const [
    isResetDialogOpen,
    { open: openResetDialog, close: closeResetDialog },
  ] = useDisclosure(false)
  const handleResetProgress = useCallback(() => {
    resetStatistics()
    closeResetDialog()
  }, [])

  return (
    <ScrollArea>
      <Stack>
        <Text>{t('SettingsAside.General.Title')}</Text>
        <Checkbox
          label={t('SettingsAside.General.DarkMode')}
          labelPosition="right"
          checked={isDarkMode}
          onChange={handleThemeChange}
        />
        <Divider />
        {/* Language ############################################################### */}
        <Text>{t('SettingsAside.Language.Title')}</Text>
        <Select
          classNames={{
            input: 'flagFix',
            option: 'flagFix',
          }}
          placeholder={t('SettingsAside.Language.Placeholder')}
          data={languageOptions}
          value={settings.language}
          onChange={handleLanguageChange}
        />
        <Divider />
        {/* Gesture Recognition #################################################### */}
        <Text>{t('SettingsAside.GestureRecognition.Title')}</Text>
        <Switch
          classNames={{
            label: clsx(classes.bold, {
              [classes.primary]: settings.gesturesEnabled,
            }),
          }}
          label={t('SettingsAside.GestureRecognition.Enabled')}
          checked={settings.gesturesEnabled}
          onChange={() => settings.toggleGesturesEnabled()}
        />
        <Checkbox
          label={t('SettingsAside.GestureRecognition.Synthetic')}
          labelPosition="right"
          checked={settings.syntheticModels}
          onChange={() => settings.toggleSyntheticModels()}
        />
        <Checkbox
          label={t('SettingsAside.GestureRecognition.Mirrored')}
          labelPosition="right"
          checked={settings.mirrored}
          onChange={() => settings.toggleMirrored()}
        />
        <Checkbox
          label={t('SettingsAside.GestureRecognition.Draw')}
          labelPosition="right"
          checked={settings.drawGestures}
          onChange={() => settings.toggleDrawGestures()}
        />
        <ColorInput
          disallowInput
          label={t('SettingsAside.GestureRecognition.Dots.Color')}
          value={settings.gestureDotsColor}
          onChange={(color) => settings.setGestureDotsColor(color)}
        />
        <NumberInput
          label={t('SettingsAside.GestureRecognition.Dots.Width')}
          allowDecimal={false}
          allowNegative={false}
          allowLeadingZeros={false}
          min={MIN_GESTURE_DRAW_WIDTH}
          max={MAX_GESTURE_DRAW_WIDTH}
          value={settings.gestureDotsWidth}
          onChange={(width) => settings.setGestureDotsWidth(Number(width))}
        />
        <ColorInput
          disallowInput
          label={t('SettingsAside.GestureRecognition.Lines.Color')}
          value={settings.gestureLinesColor}
          onChange={(color) => settings.setGestureLinesColor(color)}
        />
        <NumberInput
          label={t('SettingsAside.GestureRecognition.Lines.Width')}
          allowDecimal={false}
          allowNegative={false}
          allowLeadingZeros={false}
          min={MIN_GESTURE_DRAW_WIDTH}
          max={MAX_GESTURE_DRAW_WIDTH}
          value={settings.gestureLinesWidth}
          onChange={(width) => settings.setGestureLinesWidth(Number(width))}
        />
        <Divider />
        {/* Progress ############################################################### */}
        <Text>{t('SettingsAside.Progress.Title')}</Text>
        <Checkbox
          label={t('SettingsAside.Progress.Hearts')}
          labelPosition="right"
          checked={settings.heartsEnabled}
          onChange={settings.toggleHeartsEnabled}
        />
        <Checkbox
          label={t('SettingsAside.Progress.ForceFingerspell')}
          labelPosition="right"
          checked={settings.forceFingerspellEnabled}
          onChange={settings.toggleForceFingerspellEnabled}
        />
        <TextInput
          label={t('SettingsAside.Progress.Username')}
          value={settings.username}
          onChange={(event) => settings.setUsername(event.currentTarget.value)}
        />
        <BorderButton color="blue" size="sm" onClick={exportStatistics}>
          {t('SettingsAside.Progress.Export')}
        </BorderButton>
        <BorderButton color="teal" size="sm" onClick={importStatistics}>
          {t('SettingsAside.Progress.Import')}
        </BorderButton>
        <Link to="/profile">
          <BorderButton w="100%" size="sm" onClick={toggleOpen}>
            {t('SettingsAside.Progress.ViewStatistics')}
          </BorderButton>
        </Link>
        <BorderButton color="red" size="sm" onClick={openResetDialog}>
          {t('SettingsAside.Progress.Reset')}
        </BorderButton>
      </Stack>
      <ConfirmModal
        isOpen={isResetDialogOpen}
        title={t('SettingsAside.Progress.Modal.Title')}
        description={t('SettingsAside.Progress.Modal.Description')}
        onConfirm={handleResetProgress}
        onCancel={closeResetDialog}
        confirmButtonColor="red"
        cancelButtonColor="green"
      />
    </ScrollArea>
  )
}

export default SettingsAside
