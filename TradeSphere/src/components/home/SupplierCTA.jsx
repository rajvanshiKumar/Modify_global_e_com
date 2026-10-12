import { ChartColumn, PackagePlus, Store } from 'lucide-react';
import Button from '../common/Button';

export default function SupplierCTA() {
  const points = [
    { icon: Store, text: 'Create a company profile' },
    { icon: PackagePlus, text: 'Add, edit and manage product listings' },
    { icon: ChartColumn, text: 'Follow orders, inquiries and analytics' },
  ];
  return (
    <section aria-labelledby="supplier-cta-title" className="py-12 sm:py-16">
      <div className="ts-container">
        <div className="ts-navy-texture relative overflow-hidden rounded-3xl px-6 py-10 text-white sm:px-12 sm:py-14">
          <div className="absolute -right-20 -top-20 size-72 rounded-full bg-brand-500/20 blur-2xl" aria-hidden="true" />
          <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="ts-eyebrow !text-brand-500">For suppliers</p>
              <h2 id="supplier-cta-title" className="ts-section-title mt-2 !text-white">Become a Supplier on TradeSphere</h2>
              <p className="mt-3 max-w-xl text-navy-100">Create a supplier account, publish your products with minimum order quantities and price tiers, and answer quotation requests from business buyers.</p>
              <div className="mt-6 flex flex-col gap-3 xs:flex-row">
                <Button to="/register?role=supplier" size="lg">Become a Supplier</Button>
                <Button to="/login" size="lg" variant="glass">Supplier sign in</Button>
              </div>
            </div>
            <ul className="space-y-3">
              {points.map((point) => (
                <li key={point.text} className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium">
                  <point.icon className="size-5 shrink-0 text-brand-500" aria-hidden="true" />{point.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
