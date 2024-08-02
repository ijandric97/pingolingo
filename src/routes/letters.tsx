import LettersPage from '@/pages/LettersPage'
import { useLessonStore } from '@/store/lessonStore'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/letters')({
  component: LettersPage,
  beforeLoad: () => {
    useLessonStore.getState().clearLesson()
  },
})
