import { Link } from 'react-router-dom';
import Section from './Section';
import Image from '../common/Image';
import Skeleton from '../common/Skeleton';
import useProducts from '../../hooks/useProducts';

export function CategoryCard({ category, count }) {
  return (
    <Link to={`/categories/${category.slug}`} className="ts-card ts-card-hover group block overflow-hidden">
      <div className="overflow-hidden bg-surface">
        <Image photo={category.photo} illustration={category.illustration} width={420} height={315} alt="" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="p-3.5">
        <h3 className="text-[0.9375rem] font-bold leading-snug group-hover:text-brand-600">{category.name}</h3>
        <p className="mt-0.5 text-xs text-muted">{count} {count === 1 ? 'product' : 'products'}</p>
      </div>
    </Link>
  );
}

export default function CategoryGrid() {
  const { categories, products, loading } = useProducts();
  const count = (slug) => products.filter((product) => product.category === slug && product.status === 'Active').length;

  return (
    <Section id="home-categories" eyebrow="Browse" title="Shop by Categories" description="Twelve sourcing categories, each with its own subcategories." linkTo="/categories" linkLabel="All categories">
      {loading ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-6" role="status" aria-label="Loading categories">
          {Array.from({ length: 12 }, (_, index) => <Skeleton key={index} className="aspect-[4/5] w-full rounded-2xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-6">
          {categories.slice(0, 12).map((category) => <CategoryCard key={category.id} category={category} count={count(category.slug)} />)}
        </div>
      )}
    </Section>
  );
}
