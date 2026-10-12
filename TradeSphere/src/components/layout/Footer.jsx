import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Mail, MessageCircle, Twitter } from 'lucide-react';
import Logo from '../common/Logo';
import ResetDataButton from '../common/ResetDataButton';
import { footerColumns } from '../../data/navigation';
import { BRAND } from '../../utils/constants';

// These open each network's
// share dialog for the current site instead of pretending to link to a profile.
function shareLinks() {
  const url = encodeURIComponent(typeof window !== 'undefined' ? window.location.origin : '');
  const text = encodeURIComponent(`${BRAND.name} — ${BRAND.tagline}`);
  return [
    { label: 'Share on LinkedIn', icon: Linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}` },
    { label: 'Share on X', icon: Twitter, href: `https://twitter.com/intent/tweet?text=${text}&url=${url}` },
    { label: 'Share on Facebook', icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
    { label: 'Share on WhatsApp', icon: MessageCircle, href: `https://wa.me/?text=${text}%20${url}` },
  ];
}

export default function Footer() {
  return (
    <footer className="ts-navy-texture mt-auto text-navy-100">
      <div className="ts-container grid grid-cols-1 gap-10 py-12 lg:grid-cols-[1.3fr_3fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm text-navy-200">An international B2B marketplace connecting importers, exporters, manufacturers and wholesale buyers.</p>
          <Link to="/info/contact" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-brand-500">
            <Mail className="size-4" aria-hidden="true" />Contact TradeSphere
          </Link>
          <ul className="mt-5 flex gap-2" aria-label="Share TradeSphere">
            {shareLinks().map((item) => (
              <li key={item.label}>
                <a href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.label} title={item.label} className="inline-flex size-10 items-center justify-center rounded-full border border-white/20 text-white hover:border-brand-500 hover:bg-brand-500">
                  <item.icon className="size-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="font-display text-sm font-bold text-white">{column.title}</h2>
              <ul className="mt-3 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}><Link to={link.to} className="text-sm text-navy-200 hover:text-white">{link.label}</Link></li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="ts-container flex flex-col gap-4 py-5 text-xs text-navy-200 md:flex-row md:items-center md:justify-between">
          <p className="max-w-3xl">
            © {new Date().getFullYear()} {BRAND.name}. International B2B marketplace. Company profiles are not independently verified; please carry out your own checks before trading. Online payment processing is not yet available.
          </p>
          <ResetDataButton variant="glass" />
        </div>
      </div>
    </footer>
  );
}
