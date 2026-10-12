import { ShieldAlert } from 'lucide-react';
import Logo from '../components/common/Logo';

/** Two-column frame shared by the sign-in, register and password pages. */
export default function AuthShell({ title, subtitle, children, wide = false }) {
  return (
    <div className="ts-container py-8 sm:py-12">
      <div className={`mx-auto grid grid-cols-1 overflow-hidden rounded-3xl bg-white shadow-lift ring-1 ring-line lg:grid-cols-[1fr_1.25fr] ${wide ? 'max-w-5xl' : 'max-w-4xl'}`}>
        <aside className="ts-navy-texture relative hidden flex-col justify-between overflow-hidden p-9 text-white lg:flex">
          <div className="absolute -bottom-24 -left-16 size-72 rounded-full bg-brand-500/25 blur-2xl" aria-hidden="true" />
          <Logo light />
          <div className="relative">
            <p className="font-display text-3xl font-extrabold leading-tight">Your World of Business</p>
            <p className="mt-3 text-navy-100">Source wholesale products, compare suppliers and request quotations from importers, exporters and manufacturers worldwide.</p>
          </div>
          <p className="relative flex gap-2.5 rounded-xl border border-white/15 bg-white/5 p-3.5 text-xs text-navy-100">
            <ShieldAlert className="mt-0.5 size-4 shrink-0 text-brand-500" aria-hidden="true" />
            Prototype sign-in: accounts are stored in this browser only and are not protected by a server.
          </p>
        </aside>
        <div className="p-6 sm:p-9">
          <h1 className="text-2xl font-extrabold sm:text-[1.75rem]">{title}</h1>
          {subtitle ? <p className="mb-6 mt-1.5 text-muted">{subtitle}</p> : <div className="mb-6" />}
          {children}
          <p className="mt-6 flex gap-2 rounded-lg bg-surface p-3 text-xs text-muted lg:hidden">
            <ShieldAlert className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden="true" />
            Prototype sign-in: accounts are stored in this browser only and are not protected by a server.
          </p>
        </div>
      </div>
    </div>
  );
}
