import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/store/AppContext';
import { loginUser } from '@/lib/backend';

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!email || !password) {
        setError('Please fill in all fields');
        return;
      }

      const user = loginUser(email, password);
      setUser(user);

      const afterLogin = sessionStorage.getItem('nc_after_login');
      navigate(afterLogin || '/account');
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blush to-porcelain px-4 py-12">
      <div className="mx-auto max-w-sm">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-berry">Sign In</h1>
          <p className="mt-2 text-charcoal">Chat with our AI stylists & track your orders</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-xl border border-rose-petal/40 bg-white p-6">
          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-berry">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-2 w-full rounded-lg border border-rose-petal/60 bg-white px-3 py-2 text-charcoal outline-none focus:border-berry"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-berry">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-2 w-full rounded-lg border border-rose-petal/60 bg-white px-3 py-2 text-charcoal outline-none focus:border-berry"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full py-2.5">
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-charcoal">
          No account? Create one during checkout 💕
        </p>
      </div>
    </main>
  );
}
