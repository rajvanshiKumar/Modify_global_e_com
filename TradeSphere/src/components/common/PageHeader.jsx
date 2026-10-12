import Breadcrumbs from './Breadcrumbs';

/** Title block used at the top of marketplace pages. */
export default function PageHeader({ breadcrumbs, title, description, actions, children }) {
  return (
    <div className="border-b bg-white">
      <div className="ts-container py-6 sm:py-8">
        {breadcrumbs ? <Breadcrumbs items={breadcrumbs} className="mb-3" /> : null}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0 max-w-3xl">
            <h1 className="text-2xl font-extrabold sm:text-3xl">{title}</h1>
            {description ? <p className="mt-2 text-muted">{description}</p> : null}
          </div>
          {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
        </div>
        {children}
      </div>
    </div>
  );
}

/** Heading used inside dashboard pages. */
export function SectionHeading({ title, description, actions, as: Tag = 'h1' }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div className="min-w-0">
        <Tag className="text-xl font-extrabold sm:text-2xl">{title}</Tag>
        {description ? <p className="mt-1 text-sm text-muted">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}
