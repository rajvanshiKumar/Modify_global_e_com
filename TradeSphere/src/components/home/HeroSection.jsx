import { Link } from 'react-router-dom';
import { Building2, Search } from 'lucide-react';
import Button from '../common/Button';
import SearchForm from '../forms/SearchForm';

const POPULAR = ['Wireless earbuds', 'Kraft bags', 'Hoodie', 'Leather', 'Sofa', 'Serum'];

export default function HeroSection() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-navy-900 text-white">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800" aria-hidden="true" />
      <img src="/images/hero-trade.svg" alt="" aria-hidden="true" width="1200" height="900" className="pointer-events-none absolute -right-24 top-1/2 -z-10 hidden h-[125%] w-auto max-w-none -translate-y-1/2 opacity-90 md:block lg:-right-10 xl:right-0" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-950/85 to-transparent md:via-navy-950/70" aria-hidden="true" />

      <div className="ts-container py-14 sm:py-20 lg:py-24">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-navy-100">
            <span className="size-1.5 rounded-full bg-brand-500" aria-hidden="true" />Your World of Business
          </p>
          <h1 id="hero-title" className="mt-5 text-4xl font-extrabold !leading-[1.08] !text-white sm:text-5xl lg:text-[3.5rem]">
            Connecting Businesses <span className="text-brand-500">Across the World</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-navy-100 sm:text-lg">
            Discover quality products, compare wholesale prices, connect with suppliers, and grow your business with TradeSphere.
          </p>

          <div className="mt-8 max-w-xl">
            <SearchForm variant="hero" idPrefix="hero-search" />
            <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[0.8125rem] text-navy-200">
              <span>Popular:</span>
              {POPULAR.map((term) => (
                <Link key={term} to={`/products?q=${encodeURIComponent(term)}`} className="rounded-full border border-white/20 px-2.5 py-0.5 text-white hover:border-brand-500 hover:text-brand-500">{term}</Link>
              ))}
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 xs:flex-row">
            <Button to="/products" size="lg" icon={Search}>Explore Products</Button>
            <Button to="/suppliers" size="lg" variant="glass" icon={Building2}>Find Suppliers</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
