import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Heart, LayoutGrid, Menu, MessageSquare, Package, ShoppingCart } from 'lucide-react';
import Logo from '../common/Logo';
import { IconButton } from '../common/Button';
import SearchForm from '../forms/SearchForm';
import MegaMenu from './MegaMenu';
import MobileMenu from './MobileMenu';
import PreferencesMenu from './PreferencesMenu';
import NotificationsMenu, { CountDot } from './NotificationsMenu';
import UserMenu, { ordersPathFor } from './UserMenu';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import useWishlist from '../../hooks/useWishlist';
import useMessages from '../../hooks/useMessages';
import useDisclosure from '../../hooks/useDisclosure';
import { mainNav } from '../../data/navigation';

function IconLink({ to, icon: Icon, label, count, className = '' }) {
  return (
    <Link to={to} aria-label={`${label}${count ? `, ${count}` : ''}`} title={label} className={`relative inline-flex size-11 shrink-0 items-center justify-center rounded-[0.625rem] text-navy-900 hover:bg-navy-50 ${className}`}>
      <Icon className="size-5" aria-hidden="true" />
      <CountDot count={count} />
    </Link>
  );
}

/** True when a navigation link points at the page being viewed (path and query). */
function isActive(to, location) {
  const [path, query = ''] = to.split('?');
  if (path !== location.pathname && !(path !== '/' && location.pathname.startsWith(`${path}/`))) return false;
  const current = new URLSearchParams(location.search);
  if (!query) return !(path === '/products' && (current.get('ready') || current.get('deal')));
  return [...new URLSearchParams(query)].every(([key, value]) => current.get(key) === value);
}

export default function Header() {
  const location = useLocation();
  const { user } = useAuth();
  const { count: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { unreadCount } = useMessages();
  const mobileMenu = useDisclosure();
  const [megaOpen, setMegaOpen] = useState(false);
  const megaRef = useRef(null);
  const closeTimer = useRef(null);

  // Close menus whenever the page changes.
  useEffect(() => {
    setMegaOpen(false);
    mobileMenu.onClose();
  }, [location.pathname, location.search, mobileMenu.onClose]);

  useEffect(() => {
    if (!megaOpen) return undefined;
    const onKey = (event) => { if (event.key === 'Escape') setMegaOpen(false); };
    const onPointer = (event) => { if (!megaRef.current?.contains(event.target)) setMegaOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onPointer);
    };
  }, [megaOpen]);

  const openedAt = useRef(0);
  const openMega = () => {
    window.clearTimeout(closeTimer.current);
    setMegaOpen((value) => {
      if (!value) openedAt.current = Date.now();
      return true;
    });
  };
  // Hovering opens the menu just before a click lands, so a click right after opening keeps it open.
  const toggleMega = () => setMegaOpen((value) => (value && Date.now() - openedAt.current > 400 ? false : true));
  const scheduleClose = () => { closeTimer.current = window.setTimeout(() => setMegaOpen(false), 160); };

  return (
    <>
    <header className="sticky top-0 z-50 bg-white lg:shadow-[0_1px_0_var(--color-line)]">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white">Skip to main content</a>

      <div className="ts-container flex items-center gap-2 py-3 lg:gap-5">
        <IconButton icon={Menu} label="Open menu" onClick={mobileMenu.onOpen} className="-ml-2 lg:hidden" aria-expanded={mobileMenu.open} />
        <Logo />
        <div className="hidden min-w-0 flex-1 lg:block"><SearchForm idPrefix="header-search" /></div>
        <div className="ml-auto flex items-center gap-0.5 lg:ml-0">
          <div className="hidden xl:block"><PreferencesMenu /></div>
          <IconLink to="/messages" icon={MessageSquare} label="Messages" count={user?.notificationPrefs?.messages === false ? 0 : unreadCount} className="max-sm:hidden" />
          <NotificationsMenu />
          <IconLink to={ordersPathFor(user)} icon={Package} label="Orders" className="max-md:hidden" />
          <IconLink to="/wishlist" icon={Heart} label="Saved products" count={wishlistCount} className="max-xs:hidden" />
          <IconLink to="/cart" icon={ShoppingCart} label="Cart" count={cartCount} />
          <div className="ml-1.5 hidden sm:block"><UserMenu /></div>
        </div>
      </div>

      <nav aria-label="Main" className="hidden bg-navy-900 text-white lg:block">
        <div className="ts-container relative flex items-center gap-1" ref={megaRef} onMouseLeave={scheduleClose}>
          {mainNav.map((item) => {
            const active = isActive(item.to, location);
            const classes = `inline-flex h-12 items-center gap-1.5 border-b-2 px-3.5 text-sm font-semibold transition-colors xl:px-4 ${active ? 'border-brand-500 text-white' : 'border-transparent text-navy-100 hover:text-white'}`;
            if (item.megaMenu) {
              return (
                <div key={item.label} className="flex items-center" onMouseEnter={openMega}>
                  <Link to={item.to} className={classes}><LayoutGrid className="size-4" aria-hidden="true" />{item.label}</Link>
                  <button type="button" onClick={toggleMega} aria-expanded={megaOpen} aria-controls="mega-menu" aria-label="Show categories menu" className="-ml-2 inline-flex size-8 items-center justify-center rounded text-navy-100 hover:text-white">
                    <ChevronDown className={`size-4 transition-transform ${megaOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>
                </div>
              );
            }
            return (
              <Link key={item.label} to={item.to} onMouseEnter={scheduleClose} aria-current={active ? 'page' : undefined} className={`${classes} ${item.highlight ? 'ml-auto text-brand-500 hover:text-brand-100' : ''}`}>
                {item.label}
              </Link>
            );
          })}
          {megaOpen ? <div onMouseEnter={openMega}><MegaMenu id="mega-menu" onNavigate={() => setMegaOpen(false)} /></div> : null}
        </div>
      </nav>

    </header>
    <div className="border-b bg-white lg:hidden">
      <div className="ts-container pb-3"><SearchForm idPrefix="mobile-search" /></div>
    </div>
    <MobileMenu open={mobileMenu.open} onClose={mobileMenu.onClose} />
    </>
  );
}
