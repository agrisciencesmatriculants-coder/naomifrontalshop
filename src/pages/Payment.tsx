import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '@/store/AppContext';
import { getOrder } from '@/lib/backend';
import { BANK_DETAILS, formatPrice } from '@/lib/catalog';
import { useState, useEffect } from 'react';

export default function Payment() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { user } = useApp();
  const [order, setOrder] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<'payshap' | 'capitec'>('payshap');
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (orderId) {
      const orderData = getOrder(orderId);
      setOrder(orderData);
    }
  }, [orderId]);

  if (!user || !order) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blush to-porcelain px-4 py-12">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-charcoal">Loading payment details...</p>
        </div>
      </div>
    );
  }

  const handlePaymentConfirmation = () => {
    setConfirmed(true);
    // Simulate payment processing
    setTimeout(() => {
      navigate(`/thank-you/${orderId}`);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blush to-porcelain px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-3xl font-bold text-berry">Payment</h1>
        <p className="mt-2 text-charcoal">Order #{order.id}</p>

        {/* Payment Amount */}
        <div className="mt-6 rounded-xl bg-gradient-to-br from-berry to-rose-deep p-4 text-white">
          <p className="text-lg">Amount Due</p>
          <p className="text-4xl font-bold">{formatPrice(order.total)}</p>
        </div>

        {/* Payment Methods */}
        <div className="mt-6 rounded-xl border border-rose-petal/40 bg-white p-4">
          <h2 className="font-semibold text-berry">Select Payment Method</h2>
          <div className="mt-4 space-y-3">
            <label className="flex items-center gap-3 p-3 border border-rose-petal/40 rounded-lg hover:bg-blush cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="payshap"
                checked={paymentMethod === 'payshap'}
                onChange={() => setPaymentMethod('payshap')}
                className="h-4 w-4"
              />
              <span className="font-semibold text-charcoal">PayShap</span>
            </label>
            <label className="flex items-center gap-3 p-3 border border-rose-petal/40 rounded-lg hover:bg-blush cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="capitec"
                checked={paymentMethod === 'capitec'}
                onChange={() => setPaymentMethod('capitec')}
                className="h-4 w-4"
              />
              <span className="font-semibold text-charcoal">Capitec Cellphone Banking</span>
            </label>
          </div>
        </div>

        {/* Bank Details */}
        <div className="mt-6 rounded-xl border border-rose-petal/40 bg-white p-4">
          <h2 className="font-semibold text-berry">Bank Details</h2>
          <div className="mt-3 space-y-2 text-sm">
            <p><span className="font-semibold">Bank:</span> {BANK_DETAILS.bank}</p>
            <p><span className="font-semibold">Account Name:</span> {BANK_DETAILS.accountName}</p>
            <p><span className="font-semibold">Account Number:</span> {BANK_DETAILS.accountNumber}</p>
            <p><span className="font-semibold">Branch Code:</span> {BANK_DETAILS.branchCode}</p>
          </div>
        </div>

        {/* Confirmation */}
        {!confirmed ? (
          <button
            onClick={handlePaymentConfirmation}
            className="btn-primary mt-6 w-full py-3 text-lg"
          >
            Confirm Payment
          </button>
        ) : (
          <div className="mt-6 rounded-xl bg-green-100 p-4 text-center text-green-800">
            <p className="font-semibold">Payment received! Redirecting...</p>
          </div>
        )}

        <Link to="/" className="mt-4 block text-center text-sm text-berry underline">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
