import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Section from './Section';
import SupplierGrid from '../suppliers/SupplierGrid';
import Image from '../common/Image';
import Button from '../common/Button';
import Badge from '../common/Badge';
import CompanyLogo from '../common/CompanyLogo';
import useProducts from '../../hooks/useProducts';

/** "Recommended Suppliers": the three highest-rated companies. */
export default function SupplierShowcase() {
  const { companies, loading } = useProducts();
  const top = useMemo(() => companies.filter((company) => company.status !== 'Suspended').sort((a, b) => b.rating - a.rating).slice(0, 3), [companies]);
  return (
    <Section id="home-suppliers" tone="white" eyebrow="Suppliers" title="Recommended Suppliers" description="Highly rated manufacturers and exporters in the supplier directory." linkTo="/suppliers" linkLabel="All suppliers">
      <SupplierGrid companies={top} loading={loading} />
    </Section>
  );
}

/** Larger feature blocks for manufacturers, each with a few of their products. */
export function ManufacturerShowcase() {
  const { companies, products, loading } = useProducts();
  const featured = useMemo(() => companies
    .filter((company) => company.status !== 'Suspended' && company.businessType === 'Manufacturer')
    .map((company) => ({ company, items: products.filter((product) => product.companyId === company.id && product.status === 'Active').slice(0, 3) }))
    .filter((entry) => entry.items.length)
    .slice(0, 2), [companies, products]);

  if (loading || !featured.length) return null;
  return (
    <Section id="home-manufacturers" eyebrow="Showcase" title="Manufacturer Showcase" description="A closer look at two sample factories and what they make." linkTo="/suppliers?type=Manufacturer" linkLabel="All manufacturers">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {featured.map(({ company, items }) => (
          <article key={company.id} className="ts-card overflow-hidden">
            <div className="relative h-40 bg-navy-900">
              <Image photo={company.cover} illustration={company.coverIllustration ?? 'cover-default'} width={900} height={320} alt="" className="size-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/30 to-transparent" aria-hidden="true" />
              <div className="absolute inset-x-5 bottom-4 flex items-end gap-3">
                <CompanyLogo company={company} size="md" className="ring-2 ring-white" />
                <div className="min-w-0">
                  <h3 className="truncate text-lg font-bold !text-white">{company.name}</h3>
                  <p className="text-xs text-navy-100">{company.city}, {company.country} · Since {company.established}</p>
                </div>
              </div>
            </div>
            <div className="p-5">
              <p className="line-clamp-2 text-sm text-muted">{company.description}</p>
              <ul className="mt-4 grid grid-cols-3 gap-3">
                {items.map((product) => (
                  <li key={product.id}>
                    <Link to={`/products/${product.slug}`} className="group block">
                      <Image photo={product.photo} illustration={product.illustration} width={240} height={240} alt="" className="aspect-square w-full rounded-xl bg-surface object-cover" />
                      <span className="mt-1.5 line-clamp-2 text-xs font-medium text-ink group-hover:text-brand-600">{product.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Button to={`/suppliers/${company.slug}`} variant="outline" size="sm" iconRight={ArrowRight} className="mt-4">View Company</Button>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
