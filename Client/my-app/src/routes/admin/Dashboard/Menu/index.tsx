import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/Dashboard/Menu/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/Dashboard/Menu/"!</div>
}
