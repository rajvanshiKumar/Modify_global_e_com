import { Link } from 'react-router-dom';
import { FileText, Heart, MapPin, ShoppingCart, Zap } from 'lucide-react';
import Image from '../common/Image';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Rating from '../common/Rating';
import Tooltip from '../common/Tooltip';
import BuyNowButton from './BuyNowButton';
import useCart from '../../hooks/useCart';
import { defaultVariant } from '../../hooks/useBuyNow';
import useProducts from '../../hooks/useProducts';
import useWishlist from '../../hooks/useWishlist';
import useCurrency from '../../hooks/useCurrency';
import { getPriceRange } from '../../utils/calculateTotals';
import { quantityLabel } from '../../utils/units';

export function PriceRange({ product, className = '' }) {
  const { money } = useCurrency();
  const { min, max } = getPriceRange(product);
  return (
    <p className={className}>
      <span className="font-display text-lg font-extrabold text-navy-900">{min === max ? money(min) : `${money(min)} – ${money(max)}`}</span>
      <span className="text-[0.8125rem] text-muted"> / {product.unit}</span>
    </p>
  );
}

export function WishlistButton({ product, className = '' }) {
  const { isSaved, toggleWishlist } = useWishlist();
  const saved = isSaved(product.id);
  return (
    <button
      type="button" onClick={() => toggleWishlist(product)} aria-pressed={saved} aria-label={saved ? `Remove ${product.name} from saved products` : `Save ${product.name}`}
      title={saved ? 'Remove from saved products' : 'Save product'}
      className={`inline-flex size-9 items-center justify-center rounded-full border bg-white/95 shadow-sm transition-colors hover:border-brand-500 ${saved ? 'text-brand-500' : 'text-navy-900'} ${className}`}
    >
      <Heart className={`size-[1.125rem] ${saved ? 'fill-current' : ''}`} aria-hidden="true" />
    </button>
  );
}

/** Product tile used across the catalogue. `layout` is "grid" or "list". */
export default function ProductCard({ product, layout = 'grid' }) {
  const { getCompany } = useProducts();
  const { addToCart } = useCart();
  const company = getCompany(product.companyId);
  const href = `/products/${product.slug}`;
  const isList = layout === 'list';
  const outOfStock = product.stock <= 0;

  const badges = (
    <div className="absolute left-2.5 top-2.5 flex flex-col items-start gap-1">
      {product.deal ? <Badge tone="solid">Deal</Badge> : null}
      {product.readyToShip ? <Badge tone="dark" icon={Zap}>Ready to ship</Badge> : null}
      {product.isNew ? <Badge tone="success">New</Badge> : null}
    </div>
  );

  return (
    <article className={`ts-card ts-card-hover group relative flex overflow-hidden ${isList ? 'flex-col sm:flex-row' : 'flex-col'}`}>
      <div className={`relative shrink-0 bg-surface ${isList ? 'sm:w-56' : ''}`}>
        <Link to={href} tabIndex={-1} aria-hidden="true" className="block overflow-hidden">
          <Image photo={product.photo} illustration={product.illustration} width={480} height={480} alt="" className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${isList ? 'aspect-[4/3] sm:aspect-square sm:h-full' : 'aspect-square'}`} />
        </Link>
        {badges}
        <WishlistButton product={product} className="absolute right-2.5 top-2.5" />
        {outOfStock ? <span className="absolute inset-x-0 bottom-0 bg-navy-950/80 py-1 text-center text-xs font-semibold text-white">Out of stock</span> : null}
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-3.5 sm:p-4">
        <h3 className="line-clamp-2 min-h-[2.6em] text-[0.9375rem] font-semibold leading-snug text-ink">
          <Link to={href} className="hover:text-brand-600">{product.name}</Link>
        </h3>
        {isList ? <p className="mt-1.5 line-clamp-2 text-sm text-muted">{product.summary}</p> : null}
        <PriceRange product={product} className="mt-2" />
        <p className="text-[0.8125rem] text-ink">MOQ: <span className="font-semibold">{quantityLabel(product.moq, product.unit)}</span></p>

        <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1">
          <Rating value={product.rating} count={product.reviewCount} />
          <Tooltip text="Price per unit falls as order quantity rises.">
            <span tabIndex={0} className="inline-flex rounded-full"><Badge tone="navy">Wholesale</Badge></span>
          </Tooltip>
        </div>

        {company ? (
          <p className="mt-2 min-w-0 text-[0.8125rem] text-muted">
            <Link to={`/suppliers/${company.slug}`} className="block truncate font-medium text-navy-800 hover:text-brand-600">{company.name}</Link>
            <span className="flex items-center gap-1"><MapPin className="size-3 shrink-0" aria-hidden="true" /><span className="truncate">{company.city}, {company.country}</span></span>
          </p>
        ) : null}

        <div className={`mt-auto space-y-2 pt-3.5 ${isList ? 'sm:max-w-sm' : ''}`}>
          <div className="flex gap-2">
            <BuyNowButton product={product} className="min-w-0 flex-1 !px-2" />
            <Button variant="outline" size="sm" icon={ShoppingCart} disabled={outOfStock} onClick={() => addToCart(product, product.moq, defaultVariant(product))} aria-label={`Add ${product.name} to cart`} title="Add to Cart" className="shrink-0 !px-2.5">
              <span className={isList ? '' : 'max-sm:sr-only'}>{isList ? 'Add to Cart' : 'Cart'}</span>
            </Button>
          </div>
          <div className={`flex gap-2 ${isList ? '' : 'flex-col xl:flex-row'}`}>
            <Button to={href} variant="navy" size="sm" className="flex-1 !px-2">View Details</Button>
            <Button to={`/rfq?product=${product.id}`} variant="outline" size="sm" icon={FileText} className="flex-1 !px-2" aria-label={`Request a quote for ${product.name}`}>Request a Quote</Button>
          </div>
        </div>
      </div>
    </article>
  );
}
