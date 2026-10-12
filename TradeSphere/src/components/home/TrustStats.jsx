import { Boxes, Building2, Globe, LayoutGrid } from 'lucide-react';
import useProducts from '../../hooks/useProducts';
import Skeleton from '../common/Skeleton';

/** Headline numbers, counted from the current catalogue. */
export default function TrustStats() {
  const { products, companies, categories, loading } = useProducts();
  const activeCompanies = companies.filter((company) => company.status !== 'Suspended');
  const stats = [
    { icon: Boxes, value: products.filter((product) => product.status === 'Active').length, label: 'Sample products' },
    { icon: Building2, value: activeCompanies.length, label: 'Suppliers' },
    { icon: Globe, value: new Set(activeCompanies.map((company) => company.country)).size, label: 'Supplier countries' },
    { icon: LayoutGrid, value: categories.length, label: 'Product categories' },
  ];

  return (
    <section aria-label="Marketplace figures" className="border-b bg-white">
      <div className="ts-container py-6">
        <dl className="grid grid-cols-2 gap-x-4 gap-y-5 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3.5">
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-800"><stat.icon className="size-6" aria-hidden="true" /></span>
              <div>
                <dd className="font-display text-2xl font-extrabold leading-none text-navy-900">{loading ? <Skeleton className="h-6 w-12" /> : stat.value}</dd>
                <dt className="mt-1 text-[0.8125rem] text-muted">{stat.label}</dt>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
