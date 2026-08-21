import { motion } from 'framer-motion';
import Icon from '@/components/Icon';

const TILES = [
  {
    src: 'https://images.unsplash.com/photo-1605980776566-0486c3ac7617?q=80&w=1200&auto=format&fit=crop',
    alt: 'Featured wig from partner store',
  },
  {
    src: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=1200&auto=format&fit=crop',
    alt: 'New arrival wig from partner store',
  },
];

const STORE_URL = 'https://shop.young-agripreneurs.com';

/** Partner Store ads (#external-shop) — auto-scrolling image carousel. */
export default function Ads() {
  const loop = [...TILES, ...TILES];

  return (
    <section
      id="external-shop"
      className="relative overflow-hidden px-4 py-14"
      style={{ background: 'linear-gradient(180deg, #FFE4EC 0%, #FFF5F7 100%)' }}
    >
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-petal to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-petal to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="mb-10 text-center"
      >
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-br from-berry to-berry-deep px-4 py-1.5 text-[0.75rem] font-semibold uppercase tracking-[1.5px] text-white shadow-[0_4px_12px_rgba(184,80,106,0.3)]">
          <Icon name="open_in_new" size={0.9} />
          External Partner Store
        </div>
        <h2 className="text-[1.85rem] font-bold text-berry">
          <span className="script block text-xl text-rose-mid">handpicked extras</span>
          Would You Like These Too?
        </h2>
        <p className="mt-2 text-rose-deep">
          A peek at more crowns from our sister store at shop.young-agripreneurs.com
        </p>
      </motion.div>

      <div className="relative">
        {/* edge fade masks */}
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-[3] w-8 bg-gradient-to-r from-porcelain to-transparent" />
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-[3] w-8 bg-gradient-to-l from-porcelain to-transparent" />
        <a
          href={STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit partner store"
          className="ads-track flex w-max gap-6 py-4 hover:[animation-play-state:paused]"
          style={{ animation: 'adsScroll 22s linear infinite' }}
        >
          {loop.map((t, i) => (
            <div
              key={i}
              className="h-[220px] w-[78vw] max-w-[520px] shrink-0 overflow-hidden rounded-[18px] shadow-[0_12px_35px_rgba(255,180,198,0.35)] transition-transform duration-300 hover:scale-[1.03]"
            >
              <img
                src={t.src}
                alt={t.alt}
                width={1200}
                height={630}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.08]"
              />
            </div>
          ))}
        </a>
      </div>

      <div className="mt-8 text-center">
        <a
          href={STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border-2 border-berry bg-white/70 px-7 py-3 text-sm font-semibold text-berry backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-berry hover:text-white"
        >
          <Icon name="open_in_new" size={1.1} />
          Visit the Full External Store
        </a>
      </div>
    </section>
  );
}
