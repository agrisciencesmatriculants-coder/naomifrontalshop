import { useApp } from '@/store/AppContext';
import { Link } from 'react-router-dom';

export default function Admin() {
  const { user } = useApp();

  // Simple admin check (in production, verify user role/permissions)
  const isAdmin = user?.email?.includes('admin');

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blush to-porcelain px-4 py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-3xl font-bold text-berry">Admin Access Denied</h1>
          <p className="mt-4 text-charcoal">You don't have permission to view this page.</p>
          <Link to="/" className="btn-primary mt-6">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blush to-porcelain px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-display text-3xl font-bold text-berry">Admin Dashboard</h1>
        <p className="mt-2 text-charcoal">Welcome back, {user?.name}!</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            to="/admin/office"
            className="rounded-xl border border-rose-petal/40 bg-white p-6 hover:shadow-md"
          >
            <h2 className="font-semibold text-berry">Office Settings</h2>
            <p className="mt-2 text-sm text-charcoal">Manage staff & schedule</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
