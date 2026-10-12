import { Link, useNavigate } from 'react-router-dom';
import { Clock, MapPin, MessageSquare } from 'lucide-react';
import Button from '../common/Button';
import Badge from '../common/Badge';
import CompanyLogo from '../common/CompanyLogo';
import Rating from '../common/Rating';
import useProducts from '../../hooks/useProducts';
import useContactSupplier from '../../hooks/useContactSupplier';

export default function SupplierCard({ company }) {
  const { products } = useProducts();
  const contact = useContactSupplier();
  const navigate = useNavigate();
  const productCount = products.filter((product) => product.companyId === company.id && product.status === 'Active').length;
  const href = `/suppliers/${company.slug}`;

  return (
    <article className="ts-card ts-card-hover flex flex-col p-5">
      <div className="flex items-start gap-3.5">
        <CompanyLogo company={company} size="lg" />
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold leading-snug"><Link to={href} className="hover:text-brand-600">{company.name}</Link></h3>
          <p className="mt-1 flex items-center gap-1 text-[0.8125rem] text-muted"><MapPin className="size-3.5 shrink-0" aria-hidden="true" />{company.flag} {company.city}, {company.country}</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            <Rating value={company.rating} count={company.reviewCount} />
          </div>
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-[0.8125rem]">
        <div><dt className="text-muted">Industry</dt><dd className="font-semibold text-ink">{company.industry}</dd></div>
        <div><dt className="text-muted">Business type</dt><dd className="font-semibold text-ink">{company.businessType}</dd></div>
        <div><dt className="text-muted">Established</dt><dd className="font-semibold text-ink">{company.established}</dd></div>
        <div><dt className="text-muted">Products</dt><dd className="font-semibold text-ink">{productCount} listed</dd></div>
      </dl>

      {company.mainProducts?.length ? (
        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Main products">
          {company.mainProducts.slice(0, 4).map((item) => <li key={item} className="rounded-full bg-surface px-2.5 py-1 text-xs text-ink">{item}</li>)}
        </ul>
      ) : null}

      <p className="mt-3 flex items-center gap-1.5 text-xs text-muted"><Clock className="size-3.5" aria-hidden="true" />Typical response: {company.responseTime} (illustrative)</p>

      <div className="mt-auto flex flex-col gap-2 pt-4 xs:flex-row">
        <Button variant="navy" size="sm" className="flex-1" onClick={() => navigate(href)}>View Company</Button>
        <Button variant="outline" size="sm" icon={MessageSquare} className="flex-1" onClick={() => contact(company)}>Contact Supplier</Button>
      </div>
    </article>
  );
}
