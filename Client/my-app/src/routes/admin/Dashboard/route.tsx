import DashboardLayout from '@/ComponentAdmin/layout/DashboardLayout'
import { isAuthenticated } from '@/Until/Auth';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/Dashboard')({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: '/admin/' });
    }
  },
  component: () => <DashboardLayout><Outlet /></DashboardLayout>,

})

