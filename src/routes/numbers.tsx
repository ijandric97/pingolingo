import NumbersPage from '@/pages/NumbersPage'
import { useLessonStore } from '@/store/lessonStore'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/numbers')({
  component: NumbersPage,
  beforeLoad: () => {
    useLessonStore.getState().clearLesson()
  },
})
