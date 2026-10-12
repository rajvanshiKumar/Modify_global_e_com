import { Link, Outlet, useLocation } from 'react-router-dom';
import { Boxes, Building2, ChartColumn, FileText, Heart, Info, LayoutDashboard, LayoutGrid, MapPin, MessageSquare, Package, Settings, Users } from 'lucide-react';
import AnnouncementBar from './AnnouncementBar';
import Header from './Header';
import Footer from './Footer';
import ResetDataButton from '../common/ResetDataButton';
import useAuth from '../../hooks/useAuth';
import useProducts from '../../hooks/useProducts';
import { dashboardNav } from '../../data/navigation';

const ICONS = { LayoutDashboard, Package, FileText, MessageSquare, Heart, MapPin, Settings, Boxes, ChartColumn, Building2, Users, LayoutGrid };

const TITLES = { buyer: 'Buyer dashboard', supplier: 'Supplier dashboard', admin: 'Admin dashboard' };
const NOTES = {
  buyer: 'Everything here is saved in this browser only.',
  supplier: 'Changes you make appear in the catalogue straight away, in this browser only.',
  admin: 'Prototype admin area: role checks run in this browser only and are not a secure administration system.',
};

/** Shell for the buyer, supplier and admin areas: site header, side navigation and content. */
export default function DashboardLayout({ role }) {
  const location = useLocation();
  const { user } = useAuth();
  const { getCompany } = useProducts();
  const items = dashboardNav[role] ?? [];
  const company = role === 'supplier' && user?.companyId ? getCompany(user.companyId) : null;
  const isActive = (to) => (to === `/${role}` ? location.pathname === to : location.pathname === to || location.pathname.startsWith(`${to}/`));

  return (
    <div className="flex min-h-dvh flex-col">
      <AnnouncementBar />
      <Header />
      <div className="ts-container flex-1 py-6 lg:grid lg:grid-cols-[15.5rem_minmax(0,1fr)] lg:gap-8 lg:py-8">
        <aside className="mb-5 lg:mb-0">
          <div className="lg:sticky lg:top-40">
            <div className="ts-card hidden p-4 lg:block">
              <p className="ts-eyebrow">{TITLES[role]}</p>
              <p className="mt-1 truncate font-display font-bold text-navy-900">{company?.name ?? user?.name}</p>
              <p className="truncate text-xs text-muted">{user?.email}</p>
            </div>
            <nav aria-label={TITLES[role]} className="ts-no-scrollbar -mx-4 overflow-x-auto px-4 lg:mx-0 lg:mt-3 lg:overflow-visible lg:px-0">
              <ul className="flex gap-1.5 lg:flex-col lg:gap-0.5">
                {items.map((item) => {
                  const Icon = ICONS[item.icon] ?? LayoutDashboard;
                  const active = isActive(item.to);
                  return (
                    <li key={item.to} className="shrink-0">
                      <Link
                        to={item.to} aria-current={active ? 'page' : undefined}
                        className={`flex items-center gap-2.5 whitespace-nowrap rounded-lg px-3.5 py-2.5 text-sm font-semibold transition-colors ${active ? 'bg-navy-900 text-white' : 'bg-white text-navy-900 hover:bg-navy-50 max-lg:border lg:bg-transparent'}`}
                      >
                        <Icon className="size-4 shrink-0" aria-hidden="true" />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="mt-4 hidden rounded-xl bg-navy-50 p-4 text-xs text-navy-800 lg:block">
              <p className="flex gap-2"><Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />{NOTES[role]}</p>
              <ResetDataButton className="mt-3 w-full" />
            </div>
          </div>
        </aside>
        <main id="main" tabIndex={-1} className="min-w-0 focus:outline-none">
          <Outlet />
          <div className="mt-8 rounded-xl bg-navy-50 p-4 text-xs text-navy-800 lg:hidden">
            <p className="flex gap-2"><Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />{NOTES[role]}</p>
            <ResetDataButton className="mt-3" />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
