import { createRootRoute, Outlet } from "@tanstack/react-router"

export const Route = createRootRoute({
  component: () => (
    <div>
      <h1>App Layout</h1>
      <Outlet />
    </div>
  ),
})
