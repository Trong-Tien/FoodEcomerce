import { createFileRoute, redirect } from '@tanstack/react-router';
import DashboardLayout from '@/ComponentAdmin/layout/DashboardLayout';
import { isAuthenticated } from '@/Until/Auth';

export const Route = createFileRoute('/admin/Dashboard')({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: '/admin/' });
    }
  },
  component: DashboardLayout,
});
