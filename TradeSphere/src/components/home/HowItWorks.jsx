import { Link } from 'react-router-dom';
import Section from './Section';

const STEPS = [
  { title: 'Search Products', text: 'Search the catalogue or browse by category to build a shortlist.', to: '/products', cta: 'Browse products' },
  { title: 'Compare Suppliers', text: 'Review company profiles, minimum orders, lead times and price tiers.', to: '/suppliers', cta: 'See suppliers' },
  { title: 'Request a Quote', text: 'Send your quantity, specifications and target price in one request.', to: '/rfq', cta: 'Start a request' },
  { title: 'Place a Bulk Order', text: 'Buy Now or add items to the cart, choose shipping and payment, and confirm your order.', to: '/cart', cta: 'Go to cart' },
];

export default function HowItWorks() {
  return (
    <Section id="home-how" eyebrow="How it works" title="From first search to bulk order in four steps">
      <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, index) => (
          <li key={step.title} className="ts-card relative p-5">
            <span className="font-display text-4xl font-extrabold text-navy-100" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <h3 className="mt-2 text-base font-bold"><span className="sr-only">Step {index + 1}: </span>{step.title}</h3>
            <p className="mt-1.5 text-sm text-muted">{step.text}</p>
            <Link to={step.to} className="mt-3 inline-block text-sm font-semibold text-brand-600 hover:text-brand-700">{step.cta} →</Link>
          </li>
        ))}
      </ol>
    </Section>
  );
}
