import { Layers, FileText, MessageSquare, Search } from 'lucide-react';
import Section from './Section';

const FEATURES = [
  { icon: Search, title: 'One search, every category', text: 'Find products, suppliers and company profiles from a single search bar with filters that narrow results fast.' },
  { icon: Layers, title: 'Transparent quantity pricing', text: 'Every listing shows its minimum order and price tiers, so you can see what volume does to the unit cost.' },
  { icon: FileText, title: 'Structured quote requests', text: 'Send one clear request with quantity, specifications and target price, then track its status in your dashboard.' },
  { icon: MessageSquare, title: 'Conversations in one place', text: 'Keep supplier discussions, quotes and orders together in one message centre.' },
];

export default function WhyChoose() {
  return (
    <Section id="home-why" tone="white" eyebrow="Why TradeSphere" title="Why Choose TradeSphere" description="What the platform is designed to make easier.">
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature) => (
          <li key={feature.title} className="rounded-2xl border bg-surface/60 p-5">
            <span className="inline-flex size-11 items-center justify-center rounded-xl bg-navy-900 text-white"><feature.icon className="size-5" aria-hidden="true" /></span>
            <h3 className="mt-4 text-base font-bold">{feature.title}</h3>
            <p className="mt-1.5 text-sm text-muted">{feature.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
