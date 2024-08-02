import Layout from '@/components/Layout'
import NotFoundPage from '@/pages/NotFoundPage'
import { createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: Layout,
  notFoundComponent: NotFoundPage,
})
