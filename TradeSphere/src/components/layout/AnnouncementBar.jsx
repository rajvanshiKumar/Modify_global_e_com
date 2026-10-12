import { Link } from 'react-router-dom';
import { Info, X } from 'lucide-react';
import useLocalStorage from '../../hooks/useLocalStorage';

/** Slim brand bar above the header. */
export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useLocalStorage('announcement-dismissed', false);
  if (dismissed) return null;
  return (
    <div className="bg-navy-950 text-white">
      <div className="ts-container flex items-center gap-3 py-2 text-[0.8125rem]">
        <Info className="size-4 shrink-0 text-brand-500" aria-hidden="true" />
        <p className="min-w-0 flex-1">
          <span className="font-semibold">International B2B Marketplace.</span>{' '}
          <span className="text-navy-100">Wholesale sourcing from manufacturers, exporters and suppliers worldwide. Prices in INR.</span>{' '}
          <Link to="/info/about" className="font-semibold text-brand-500 underline-offset-2 hover:underline">About TradeSphere</Link>
        </p>
        <button type="button" onClick={() => setDismissed(true)} aria-label="Dismiss announcement" className="rounded p-1 text-navy-200 hover:bg-white/10 hover:text-white">
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
