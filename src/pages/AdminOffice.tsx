import { Link } from 'react-router-dom';
import { MANAGERS, SALES_STYLISTS } from '@/lib/office';

export default function AdminOffice() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blush to-porcelain px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <Link to="/admin" className="text-sm text-berry underline">← Back to Admin</Link>
        <h1 className="font-display mt-4 text-3xl font-bold text-berry">Office Management</h1>

        {/* Managers */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-charcoal">Managers</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {MANAGERS.map((manager) => (
              <div key={manager.id} className="rounded-xl border border-rose-petal/40 bg-white p-4">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full font-bold text-white"
                    style={{ backgroundColor: manager.color }}
                  >
                    {manager.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal">{manager.name}</p>
                    <p className="text-xs text-rose-deep">{manager.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sales Stylists */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-charcoal">Sales Stylists</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SALES_STYLISTS.map((stylist) => (
              <div key={stylist.id} className="rounded-xl border border-rose-petal/40 bg-white p-4">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full font-bold text-white"
                    style={{ backgroundColor: stylist.color }}
                  >
                    {stylist.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal">{stylist.name}</p>
                    <p className="text-xs text-rose-deep">{stylist.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
