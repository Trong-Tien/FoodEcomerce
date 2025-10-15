import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/Dashboard/Voucher/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/Dashboard/Voucher/"!</div>
}
