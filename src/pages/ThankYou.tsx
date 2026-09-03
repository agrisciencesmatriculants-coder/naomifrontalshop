import { useParams, Link } from 'react-router-dom';
import { useApp } from '@/store/AppContext';
import { getOrder } from '@/lib/backend';
import Icon from '@/components/Icon';
import { useState, useEffect } from 'react';

export default function ThankYou() {
  const { orderId } = useParams<{ orderId: string }>();
  const { user } = useApp();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (orderId) {
      const orderData = getOrder(orderId);
      setOrder(orderData);
    }
  }, [orderId]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blush to-porcelain px-4 py-12">
      <div className="mx-auto max-w-2xl text-center">
        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-berry to-rose-deep text-white shadow-lg">
            <Icon name="check_circle" size={2.5} />
          </div>
        </div>

        <h1 className="font-display mt-6 text-4xl font-bold text-berry">Order Confirmed! 👑</h1>
        <p className="mt-4 text-charcoal">
          Thank you for your order, {user?.name.split(' ')[0]}!
        </p>

        {order && (
          <div className="mt-6 rounded-xl border border-rose-petal/40 bg-white p-6 text-left">
            <h2 className="font-semibold text-berry">Order Details</h2>
            <p className="mt-2 text-sm text-charcoal">
              <span className="font-semibold">Order ID:</span> {order.id}
            </p>
            <p className="text-sm text-charcoal">
              <span className="font-semibold">Status:</span> Processing
            </p>
          </div>
        )}

        <div className="mt-6 space-y-3 rounded-xl border border-rose-petal/40 bg-blue-50 p-4 text-left text-sm">
          <p>
            <span className="font-semibold">📧 Confirmation email</span> sent to {user?.email}
          </p>
          <p>
            <span className="font-semibold">🚚 Delivery updates</span> will be sent via WhatsApp
          </p>
          <p>
            <span className="font-semibold">⏱️ Processing time</span> 1-2 days, then 2-6 days delivery
          </p>
        </div>

        <Link to="/track" className="btn-primary mt-6">
          Track Your Order
        </Link>

        <Link to="/" className="mt-4 block text-sm text-berry underline">
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}
