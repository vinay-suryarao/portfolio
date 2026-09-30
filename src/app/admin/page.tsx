import type { Metadata } from 'next';
import AdminApp from '@/components/Admin/AdminApp';

// Not linked from anywhere on the site; reachable only by visiting /admin.
export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminApp />;
}
