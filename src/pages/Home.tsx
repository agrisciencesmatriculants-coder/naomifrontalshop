import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '@/store/AppContext';
import { PRODUCTS, formatPrice } from '@/lib/catalog';
import Petals from '@/components/Petals';
import ProductImage from '@/components/ProductImage';

export default function Home() {
  const { addToCart } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'bob' | 'bouncy' | 'human'>('all');

  const filteredProducts =
    selectedCategory === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  const handleAddToCart = (product: typeof PRODUCTS[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      category: product.category,
      length: product.length,
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blush to-porcelain">
      <Petals />

      {/* Hero Section */}
      <section className="relative px-4 py-12 text-center md:py-20">
        <h1 className="font-display text-4xl font-bold text-berry md:text-5xl">
          Every Crown Tells a Story
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-charcoal">
          Handcrafted premium wigs, made in-house in Johannesburg & Polokwane. Fast, nationwide delivery.
        </p>
      </section>

      {/* Filter Buttons */}
      <section className="flex justify-center gap-2 px-4 py-6">
        {['all', 'bob', 'bouncy', 'human'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat as typeof selectedCategory)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              selectedCategory === cat
                ? 'bg-berry text-white'
                : 'border border-berry bg-white text-berry hover:bg-blush'
            }`}
          >
            {cat === 'all' ? 'All' : cat === 'bob' ? 'Bob' : cat === 'bouncy' ? 'Bouncy Blend' : 'Human Blend'}
          </button>
        ))}
      </section>

      {/* Product Grid */}
      <section className="px-4 py-8 md:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl border border-rose-petal/40 bg-white p-4 shadow-soft transition-transform hover:shadow-md hover:scale-105"
            >
              <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-blush to-porcelain">
                <ProductImage name={product.name} />
                {product.badge && (
                  <div className="absolute top-2 right-2 rounded-full bg-gold px-3 py-1 text-xs font-bold text-berry">
                    {product.badge}
                  </div>
                )}
              </div>
              <h2 className="mt-3 font-semibold text-charcoal">{product.name}</h2>
              <p className="text-sm text-rose-deep">{formatPrice(product.price)}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="btn-primary mt-3 w-full"
              >
                Add to Bag
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-berry to-rose-deep px-4 py-12 text-center text-white">
        <h2 className="text-2xl font-bold">Need Help Choosing?</h2>
        <p className="mt-2">Chat with our AI stylists — we're here 24/7</p>
        <button className="btn-primary mt-4" onClick={() => window.dispatchEvent(new CustomEvent('nc:open-concierge'))}>
          Open Chat
        </button>
      </section>
    </main>
  );
}
