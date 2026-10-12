import { FileText, ShieldCheck } from 'lucide-react';
import Button from '../common/Button';

/** Two promotional banners: quote requests and the buyer protection guide. */
export default function PromoBanners() {
  return (
    <section aria-label="Sourcing tools" className="py-4">
      <div className="ts-container grid grid-cols-1 gap-5 md:grid-cols-2">
        <article className="relative overflow-hidden rounded-2xl bg-brand-500 p-6 text-white sm:p-8">
          <FileText className="absolute -right-6 -top-6 size-40 opacity-15" aria-hidden="true" />
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/90">Request for quotation</p>
          <h2 className="mt-2 max-w-sm text-2xl font-extrabold !text-white">Tell suppliers what you need, once</h2>
          <p className="mt-2 max-w-md text-sm text-white/90">Describe the product, quantity and target price, then follow the status of your request in your dashboard.</p>
          <Button to="/rfq" variant="white" className="mt-5">Request a Quote</Button>
        </article>
        <article className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-card ring-1 ring-line sm:p-8">
          <ShieldCheck className="absolute -right-6 -top-6 size-40 text-navy-50" aria-hidden="true" />
          <div className="relative">
            <p className="ts-eyebrow">Trade safely</p>
            <h2 className="mt-2 max-w-sm text-2xl font-extrabold">Buyer protection guide</h2>
            <p className="mt-2 max-w-md text-sm text-muted">Practical checks for samples, payments and inspections. General guidance only: TradeSphere does not offer a payment-protection service.</p>
            <Button to="/info/buyer-protection" variant="navy" className="mt-5">Read the guide</Button>
          </div>
        </article>
      </div>
    </section>
  );
}
