import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/** Standard homepage section: eyebrow, title, optional "view all" link, then content. */
export default function Section({ id, eyebrow, title, description, linkTo, linkLabel = 'View all', className = '', tone = 'plain', children }) {
  const tones = { plain: '', white: 'bg-white border-y', navy: 'ts-navy-texture text-white' };
  const isNavy = tone === 'navy';
  return (
    <section aria-labelledby={`${id}-title`} className={`py-12 sm:py-16 ${tones[tone]} ${className}`}>
      <div className="ts-container">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <div className="max-w-2xl">
            {eyebrow ? <p className={`ts-eyebrow ${isNavy ? '!text-brand-500' : ''}`}>{eyebrow}</p> : null}
            <h2 id={`${id}-title`} className={`ts-section-title mt-1.5 ${isNavy ? '!text-white' : ''}`}>{title}</h2>
            {description ? <p className={`mt-2 ${isNavy ? 'text-navy-100' : 'text-muted'}`}>{description}</p> : null}
          </div>
          {linkTo ? (
            <Link to={linkTo} className={`inline-flex items-center gap-1.5 text-sm font-semibold ${isNavy ? 'text-white hover:text-brand-500' : 'text-navy-900 hover:text-brand-600'}`}>
              {linkLabel} <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
