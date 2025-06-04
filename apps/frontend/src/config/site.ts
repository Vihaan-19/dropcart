export const siteConfig = {
  name: 'DropCart',
  description:
    'A modern multi-vendor e-commerce platform built with Next.js, TypeScript, and Tailwind CSS.',
  url: 'https://dropcart.com',
  ogImage: 'https://dropcart.com/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/dropcart',
    github: 'https://github.com/yourusername/dropcart',
    docs: 'https://docs.dropcart.com',
  },
  mainNav: [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'Products',
      href: '/products',
    },
    {
      title: 'Categories',
      href: '/categories',
    },
    {
      title: 'About',
      href: '/about',
    },
    {
      title: 'Contact',
      href: '/contact',
    },
  ],
  footerNav: [
    {
      title: 'Company',
      items: [
        { title: 'About', href: '/about' },
        { title: 'Careers', href: '/careers' },
        { title: 'Blog', href: '/blog' },
        { title: 'Press', href: '/press' },
      ],
    },
    {
      title: 'Support',
      items: [
        { title: 'Help Center', href: '/help' },
        { title: 'Community', href: '/community' },
        { title: 'Status', href: '/status' },
        { title: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Legal',
      items: [
        { title: 'Privacy', href: '/privacy' },
        { title: 'Terms', href: '/terms' },
        { title: 'Cookie Policy', href: '/cookie-policy' },
      ],
    },
  ],
  dashboardNav: [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: 'LayoutDashboard',
    },
    {
      title: 'Products',
      href: '/dashboard/products',
      icon: 'Package',
    },
    {
      title: 'Orders',
      href: '/dashboard/orders',
      icon: 'ShoppingCart',
    },
    {
      title: 'Customers',
      href: '/dashboard/customers',
      icon: 'Users',
    },
    {
      title: 'Analytics',
      href: '/dashboard/analytics',
      icon: 'BarChart',
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: 'Settings',
    },
  ],
  features: [
    {
      title: 'Multi-vendor Marketplace',
      description:
        'Connect with multiple vendors and expand your product catalog with ease.',
      icon: 'Store',
    },
    {
      title: 'Secure Payments',
      description:
        'Multiple payment gateways with secure and fast checkout process.',
      icon: 'CreditCard',
    },
    {
      title: 'Real-time Analytics',
      description:
        'Get insights into your sales, customers, and products with real-time analytics.',
      icon: 'BarChart',
    },
    {
      title: 'Mobile Responsive',
      description:
        'Fully responsive design that works on all devices and screen sizes.',
      icon: 'Smartphone',
    },
  ],
} as const;
