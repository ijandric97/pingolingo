import { useTranslate } from '@/i18n'
import { Group } from '@mantine/core'
import { useMemo } from 'react'

import UserPieChart from './UserPieChart'
import classes from './UserPieCharts.module.css'

type TUserPieChartsProps = {
  accuracy: number
  catLetters: number
  catNumbers: number
  catWords: number
  typCamera: number
  typConnect: number
  typSymbol: number
  typGesture: number
}

const UserPieCharts = ({
  accuracy,
  catLetters,
  catNumbers,
  catWords,
  typCamera,
  typConnect,
  typSymbol,
  typGesture,
}: TUserPieChartsProps) => {
  const { t } = useTranslate()

  const dataAccuracy = useMemo(
    () => [
      {
        name: 'ProfilePage.Accuracy.Successful',
        value: accuracy,
        color: 'green.6',
      },
      {
        name: 'ProfilePage.Accuracy.Failed',
        value: 100 - accuracy,
        color: 'red.6',
      },
    ],
    [accuracy],
  )

  const dataCategory = useMemo(
    () => [
      {
        name: 'ProfilePage.Category.Letters',
        value: catLetters,
        color: 'yellow.6',
      },
      {
        name: 'ProfilePage.Category.Numbers',
        value: catNumbers,
        color: 'grape.6',
      },
      {
        name: 'ProfilePage.Category.Words',
        value: catWords,
        color: 'cyan.6',
      },
    ],
    [catLetters, catNumbers, catWords],
  )

  const dataType = useMemo(
    () => [
      {
        name: 'ProfilePage.Type.Camera',
        value: typCamera,
        color: 'orange.6',
      },
      {
        name: 'ProfilePage.Type.Connect',
        value: typConnect,
        color: 'teal.6',
      },
      {
        name: 'ProfilePage.Type.GuessSymbol',
        value: typSymbol,
        color: 'violet.6',
      },
      {
        name: 'ProfilePage.Type.GuessGesture',
        value: typGesture,
        color: 'pink.6',
      },
    ],
    [typCamera, typConnect, typSymbol, typGesture],
  )

  return (
    <Group
      gap="md"
      justify="center"
      align="center"
      className={classes.container}
      grow
    >
      <UserPieChart
        title={t('ProfilePage.Accuracy.Title')}
        data={dataAccuracy}
      />
      <UserPieChart
        title={t('ProfilePage.Category.Title')}
        data={dataCategory}
      />
      <UserPieChart title={t('ProfilePage.Type.Title')} data={dataType} />
    </Group>
  )
}

export default UserPieCharts
