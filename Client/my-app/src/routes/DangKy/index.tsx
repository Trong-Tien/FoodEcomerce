import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/DangKy/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/DangKy/"!</div>
}
