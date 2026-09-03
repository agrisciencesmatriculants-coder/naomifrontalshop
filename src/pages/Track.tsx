import { useParams } from 'react-router-dom';
import { useApp } from '@/store/AppContext';
import { getOrder, listOrdersForUser, STATUS_LABELS } from '@/lib/backend';
import { formatPrice } from '@/lib/catalog';
import StatusChip from '@/components/StatusChip';
import { useState, useEffect } from 'react';

export default function Track() {
  const { orderId } = useParams<{ orderId: string }>();
  const { user } = useApp();
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => {
    if (user) {
      const userOrders = listOrdersForUser(user.id);
      setOrders(userOrders);
      if (orderId) {
        const order = getOrder(orderId);
        setSelectedOrder(order);
      } else if (userOrders.length > 0) {
        setSelectedOrder(userOrders[0]);
      }
    }
  }, [user, orderId]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blush to-porcelain px-4 py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-3xl font-bold text-berry">Sign In to Track Orders</h1>
          <p className="mt-4 text-charcoal">Please log in to view your order tracking.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blush to-porcelain px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-3xl font-bold text-berry">Order Tracking</h1>

        {orders.length === 0 ? (
          <p className="mt-4 text-charcoal">No orders yet. Start shopping!</p>
        ) : (
          <>
            {/* Order List */}
            {orders.length > 1 && (
              <div className="mt-6 space-y-2">
                {orders.map((order) => (
                  <button
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className={`w-full rounded-lg border p-3 text-left transition-colors ${
                      selectedOrder?.id === order.id
                        ? 'border-berry bg-blush'
                        : 'border-rose-petal/40 hover:bg-white'
                    }`}
                  >
                    <p className="font-semibold text-charcoal">Order #{order.id}</p>
                    <p className="text-sm text-rose-deep">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </button>
                ))}
              </div>
            )}

            {/* Selected Order Details */}
            {selectedOrder && (
              <div className="mt-6 rounded-xl border border-rose-petal/40 bg-white p-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-charcoal">Order #{selectedOrder.id}</h2>
                  <StatusChip status={selectedOrder.status} />
                </div>

                {/* Items */}
                <div className="mt-4 space-y-2 border-t border-rose-petal/20 pt-4">
                  {selectedOrder.items.map((item: any) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.qty}× {item.name}</span>
                      <span>{formatPrice(item.price * item.qty)}</span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="mt-4 border-t border-rose-petal/20 pt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(selectedOrder.total)}</span>
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="mt-6 border-t border-rose-petal/20 pt-4">
                  <h3 className="font-semibold text-charcoal">Delivery Timeline</h3>
                  <div className="mt-3 space-y-2 text-sm">
                    <p>
                      <span className="font-semibold">Status:</span> {STATUS_LABELS[selectedOrder.status]}
                    </p>
                    <p>
                      <span className="font-semibold">Method:</span>{' '}
                      {selectedOrder.deliveryMethod === 'paxi' ? 'Paxi (PEP stores)' : 'PostNet'}
                    </p>
                    <p>
                      <span className="font-semibold">Location:</span>{' '}
                      {selectedOrder.deliveryLocation === 'johannesburg' ? 'Johannesburg' : 'Polokwane'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
