import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Section from './Section';
import Image from '../common/Image';
import useProducts from '../../hooks/useProducts';

/** "Browse by Industry" banners. Each one opens the supplier directory filtered to that industry. */
export default function IndustrySection() {
  const { companies, loading } = useProducts();
  const industries = useMemo(() => {
    const seen = new Map();
    companies.filter((company) => company.status !== 'Suspended').forEach((company) => {
      const entry = seen.get(company.industry) ?? { name: company.industry, count: 0, cover: company.cover, illustration: company.coverIllustration ?? 'cover-default' };
      entry.count += 1;
      seen.set(company.industry, entry);
    });
    return [...seen.values()].slice(0, 6);
  }, [companies]);

  if (loading || !industries.length) return null;
  return (
    <Section id="home-industries" eyebrow="Industries" title="Browse by Industry" description="Jump straight to suppliers that specialise in your sector." linkTo="/suppliers" linkLabel="Supplier directory">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry) => (
          <Link key={industry.name} to={`/suppliers?industry=${encodeURIComponent(industry.name)}`} className="group relative isolate block h-40 overflow-hidden rounded-2xl bg-navy-900 shadow-card">
            <Image photo={industry.cover} illustration={industry.illustration} width={720} height={320} alt="" className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950/90 via-navy-950/45 to-navy-950/10" aria-hidden="true" />
            <div className="flex h-full flex-col justify-end p-5">
              <h3 className="text-lg font-bold !text-white">{industry.name}</h3>
              <p className="mt-0.5 flex items-center gap-1.5 text-[0.8125rem] font-medium text-navy-100">
                {industry.count} {industry.count === 1 ? 'supplier' : 'suppliers'}
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
