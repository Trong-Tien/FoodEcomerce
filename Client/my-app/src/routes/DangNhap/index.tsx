import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/DangNhap/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/DangNhap/"!</div>
}
