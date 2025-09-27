import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/Dashboard/Product/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/Dashboard/Product/"!</div>
}
