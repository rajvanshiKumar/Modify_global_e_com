import { useMemo } from 'react';
import Section from './Section';
import ProductGrid from '../products/ProductGrid';
import useProducts from '../../hooks/useProducts';

export default function ReadyToShip() {
  const { products, loading } = useProducts();
  const items = useMemo(() => products.filter((product) => product.status === 'Active' && product.readyToShip && product.stock > 0).slice(0, 4), [products]);
  if (!loading && !items.length) return null;
  return (
    <Section id="home-ready" eyebrow="In stock" title="Ready-to-Ship Products" description="Held in stock by the supplier and dispatched within days rather than weeks." linkTo="/products?ready=1" linkLabel="All ready-to-ship">
      <ProductGrid products={items} loading={loading} skeletonCount={4} columns="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4" />
    </Section>
  );
}
