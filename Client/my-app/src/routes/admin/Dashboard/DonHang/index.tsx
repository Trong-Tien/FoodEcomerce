import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/Dashboard/DonHang/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/Dashboard/DonHang/"!</div>
}
