import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { TrendingDown } from 'lucide-react';
import Section from './Section';
import Image from '../common/Image';
import Button from '../common/Button';
import Skeleton from '../common/Skeleton';
import PriceTiers from '../products/PriceTiers';
import BuyNowButton from '../products/BuyNowButton';
import useProducts from '../../hooks/useProducts';
import { getPriceRange } from '../../utils/calculateTotals';

/** Deal products shown with their quantity price tiers. */
export default function WholesaleDeals() {
  const { products, loading } = useProducts();
  const deals = useMemo(() => products.filter((product) => product.status === 'Active' && product.deal).slice(0, 3), [products]);
  if (!loading && !deals.length) return null;

  return (
    <Section id="home-deals" tone="navy" eyebrow="Wholesale deals" title="The more you order, the lower the unit price" description="Quantity price tiers in INR. Larger orders unlock lower unit prices." linkTo="/products?deal=1" linkLabel="All deals">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {loading ? Array.from({ length: 3 }, (_, index) => <Skeleton key={index} className="h-64 w-full rounded-2xl opacity-20" />) : deals.map((product) => {
          const { min, max } = getPriceRange(product);
          const saving = max ? Math.round((1 - min / max) * 100) : 0;
          return (
            <article key={product.id} className="flex flex-col rounded-2xl bg-white p-4 text-ink shadow-lift sm:p-5">
              <div className="flex gap-4">
                <Link to={`/products/${product.slug}`} tabIndex={-1} aria-hidden="true" className="shrink-0">
                  <Image photo={product.photo} illustration={product.illustration} width={200} height={200} alt="" className="size-24 rounded-xl bg-surface object-cover" />
                </Link>
                <div className="min-w-0">
                  {saving ? <p className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-bold text-brand-700"><TrendingDown className="size-3.5" aria-hidden="true" />Save up to {saving}% at volume</p> : null}
                  <h3 className="mt-1.5 line-clamp-2 text-base font-bold leading-snug"><Link to={`/products/${product.slug}`} className="hover:text-brand-600">{product.name}</Link></h3>
                  <p className="mt-1 text-xs text-muted">Price per {product.unit}, by quantity</p>
                </div>
              </div>
              <div className="mt-4"><PriceTiers product={product} compact /></div>
              <div className="mt-auto flex flex-wrap gap-2 pt-4">
                <BuyNowButton product={product} className="w-full" />
                <Button to={`/products/${product.slug}`} variant="navy" size="sm" className="flex-1">View Details</Button>
                <Button to={`/rfq?product=${product.id}`} variant="outline" size="sm" className="flex-1">Request a Quote</Button>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
