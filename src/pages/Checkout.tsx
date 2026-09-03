import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '@/store/AppContext';
import { COURIERS, FREE_DELIVERY_THRESHOLD, formatPrice } from '@/lib/catalog';
import { createOrder } from '@/lib/backend';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, user, clearCart } = useApp();
  const [location, setLocation] = useState<'johannesburg' | 'polokwane'>('johannesburg');
  const [courier, setCourier] = useState<'paxi' | 'postnet'>('paxi');
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blush to-porcelain px-4 py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-3xl font-bold text-berry">Sign In to Checkout</h1>
          <p className="mt-4 text-charcoal">Please log in to complete your order.</p>
          <Link to="/login" className="btn-primary mt-6">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blush to-porcelain px-4 py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-3xl font-bold text-berry">Your Bag is Empty</h1>
          <Link to="/" className="btn-primary mt-6">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const courierFee = COURIERS[courier].fee;
  const hasFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;
  const deliveryFee = hasFreeDelivery ? 0 : courierFee;
  const total = subtotal + deliveryFee;

  const handleCheckout = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const order = createOrder(
        user.id,
        cart.map((item) => ({
          id: item.id,
          qty: item.quantity,
          name: item.name,
          price: item.price,
        })),
        total,
        courier,
        location
      );
      clearCart();
      navigate(`/payment/${order.id}`);
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blush to-porcelain px-4 py-8 md:px-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-3xl font-bold text-berry">Order Summary</h1>

        {/* Cart Items */}
        <div className="mt-6 space-y-3 rounded-xl border border-rose-petal/40 bg-white p-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>
                {item.quantity}× {item.name}
              </span>
              <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        {/* Location Selection */}
        <div className="mt-6 rounded-xl border border-rose-petal/40 bg-white p-4">
          <label className="block text-sm font-semibold text-berry">Delivery Location</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value as typeof location)}
            className="mt-2 w-full rounded-lg border border-rose-petal/60 bg-white px-3 py-2 text-charcoal outline-none focus:border-berry"
          >
            <option value="johannesburg">Johannesburg, Gauteng</option>
            <option value="polokwane">Polokwane, Limpopo</option>
          </select>
        </div>

        {/* Courier Selection */}
        <div className="mt-4 rounded-xl border border-rose-petal/40 bg-white p-4">
          <label className="block text-sm font-semibold text-berry">Delivery Method</label>
          <div className="mt-2 space-y-2">
            {Object.entries(COURIERS).map(([key, courier]) => (
              <label key={key} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="courier"
                  value={key}
                  checked={courier === key}
                  onChange={() => setCourier(key as typeof courier)}
                  className="h-4 w-4"
                />
                <span className="text-sm text-charcoal">
                  {courier.name} — {formatPrice(courier.fee)} ({courier.eta})
                  {hasFreeDelivery && <span className="ml-2 font-semibold text-gold">FREE</span>}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Order Total */}
        <div className="mt-6 rounded-xl bg-gradient-to-br from-berry to-rose-deep p-4 text-white">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="mt-2 flex justify-between border-t border-white/20 pt-2">
            <span>Delivery</span>
            <span>{hasFreeDelivery ? 'FREE' : formatPrice(deliveryFee)}</span>
          </div>
          <div className="mt-3 flex justify-between border-t border-white/20 pt-3 text-lg font-bold">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="btn-primary mt-6 w-full py-3 text-lg"
        >
          {loading ? 'Processing...' : 'Proceed to Payment'}
        </button>

        <Link to="/" className="mt-4 block text-center text-sm text-berry underline">
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}
