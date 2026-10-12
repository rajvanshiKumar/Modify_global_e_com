// All navigation lives here so the header, mobile menu, footer and dashboards stay in sync.

export const mainNav = [
  { label: 'Categories', to: '/categories', megaMenu: true },
  { label: 'Products', to: '/products' },
  { label: 'Suppliers', to: '/suppliers' },
  { label: 'Ready to Ship', to: '/products?ready=1' },
  { label: 'Deals', to: '/products?deal=1' },
  { label: 'Buyer Protection', to: '/info/buyer-protection' },
  { label: 'Become a Supplier', to: '/register?role=supplier', highlight: true },
];

export const footerColumns = [
  {
    title: 'About TradeSphere',
    links: [
      { label: 'About us', to: '/info/about' },
      { label: 'How it works', to: '/info/about#how-it-works' },
      { label: 'Contact', to: '/info/contact' },
    ],
  },
  {
    title: 'For buyers',
    links: [
      { label: 'Browse products', to: '/products' },
      { label: 'All categories', to: '/categories' },
      { label: 'Request a quote', to: '/rfq' },
      { label: 'Buyer protection guide', to: '/info/buyer-protection' },
      { label: 'Buyer dashboard', to: '/buyer' },
    ],
  },
  {
    title: 'For suppliers',
    links: [
      { label: 'Become a supplier', to: '/register?role=supplier' },
      { label: 'Supplier directory', to: '/suppliers' },
      { label: 'Supplier dashboard', to: '/supplier' },
    ],
  },
  {
    title: 'Help & policies',
    links: [
      { label: 'Help Center', to: '/info/help' },
      { label: 'Terms of use', to: '/info/terms' },
      { label: 'Privacy', to: '/info/privacy' },
    ],
  },
];

export const dashboardNav = {
  buyer: [
    { label: 'Overview', to: '/buyer', icon: 'LayoutDashboard' },
    { label: 'Orders', to: '/buyer/orders', icon: 'Package' },
    { label: 'Quotes', to: '/buyer/quotes', icon: 'FileText' },
    { label: 'Messages', to: '/messages', icon: 'MessageSquare' },
    { label: 'Saved products', to: '/buyer/wishlist', icon: 'Heart' },
    { label: 'Address book', to: '/buyer/addresses', icon: 'MapPin' },
    { label: 'Profile & settings', to: '/buyer/profile', icon: 'Settings' },
  ],
  supplier: [
    { label: 'Overview', to: '/supplier', icon: 'LayoutDashboard' },
    { label: 'Products & inventory', to: '/supplier/products', icon: 'Boxes' },
    { label: 'Orders', to: '/supplier/orders', icon: 'Package' },
    { label: 'Inquiries', to: '/supplier/inquiries', icon: 'FileText' },
    { label: 'Messages', to: '/messages', icon: 'MessageSquare' },
    { label: 'Analytics', to: '/supplier/analytics', icon: 'ChartColumn' },
    { label: 'Company settings', to: '/supplier/settings', icon: 'Settings' },
  ],
  admin: [
    { label: 'Overview', to: '/admin', icon: 'LayoutDashboard' },
    { label: 'Products', to: '/admin/products', icon: 'Boxes' },
    { label: 'Companies', to: '/admin/companies', icon: 'Building2' },
    { label: 'Users', to: '/admin/users', icon: 'Users' },
    { label: 'Categories', to: '/admin/categories', icon: 'LayoutGrid' },
    { label: 'Reports', to: '/admin/reports', icon: 'ChartColumn' },
  ],
};
