import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '@/store/AppContext';
import Icon from '@/components/Icon';

export default function Account() {
  const navigate = useNavigate();
  const { user, logout } = useApp();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blush to-porcelain px-4 py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-3xl font-bold text-berry">Your Account</h1>
          <p className="mt-4 text-charcoal">Please log in to view your account.</p>
          <Link to="/login" className="btn-primary mt-6">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blush to-porcelain px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-3xl font-bold text-berry">Your Account</h1>

        {/* Profile Info */}
        <div className="mt-6 rounded-xl border border-rose-petal/40 bg-white p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-berry to-rose-deep text-white font-bold text-lg">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-charcoal">{user.name}</h2>
              <p className="text-sm text-rose-deep">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link
            to="/track"
            className="flex items-center gap-3 rounded-lg border border-rose-petal/40 bg-white p-4 hover:bg-blush"
          >
            <Icon name="local_shipping" size={1.5} className="text-berry" />
            <div>
              <p className="font-semibold text-charcoal">Track Orders</p>
              <p className="text-xs text-rose-deep">View your order status</p>
            </div>
          </Link>
          <Link
            to="/liked"
            className="flex items-center gap-3 rounded-lg border border-rose-petal/40 bg-white p-4 hover:bg-blush"
          >
            <Icon name="favorite" size={1.5} className="text-berry" />
            <div>
              <p className="font-semibold text-charcoal">Favorites</p>
              <p className="text-xs text-rose-deep">Your liked wigs</p>
            </div>
          </Link>
        </div>

        {/* Account Actions */}
        <div className="mt-8">
          <button
            onClick={handleLogout}
            className="w-full rounded-lg border-2 border-berry px-4 py-3 font-semibold text-berry transition-colors hover:bg-blush"
          >
            Sign Out
          </button>
        </div>
      </div>
    </main>
  );
}
