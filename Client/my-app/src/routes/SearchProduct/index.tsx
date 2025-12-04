import { createFileRoute } from '@tanstack/react-router'
import SearchPage from '@/Pages/SearchPage'

export const Route = createFileRoute('/SearchProduct/')({
  component: SearchPage,
})

