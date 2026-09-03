import { Link } from 'react-router-dom';

export default function Liked() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blush to-porcelain px-4 py-12">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-3xl font-bold text-berry">Your Favorites</h1>
        <p className="mt-4 text-charcoal">You haven't liked any wigs yet. Browse our collection and add your favorites!</p>
        <Link to="/" className="btn-primary mt-6">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
