import HeroSection from '../components/home/HeroSection';
import TrustStats from '../components/home/TrustStats';
import CategoryGrid from '../components/home/CategoryGrid';
import FeaturedProducts from '../components/home/FeaturedProducts';
import ReadyToShip from '../components/home/ReadyToShip';
import SupplierShowcase, { ManufacturerShowcase } from '../components/home/SupplierShowcase';
import WholesaleDeals from '../components/home/WholesaleDeals';
import IndustrySection from '../components/home/IndustrySection';
import PromoBanners from '../components/home/PromoBanners';
import WhyChoose from '../components/home/WhyChoose';
import HowItWorks from '../components/home/HowItWorks';
import SupplierCTA from '../components/home/SupplierCTA';
import Newsletter from '../components/home/Newsletter';
import ErrorState from '../components/common/ErrorState';
import useProducts from '../hooks/useProducts';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function Home() {
  const { error, reload } = useProducts();
  useDocumentTitle('');

  return (
    <>
      <HeroSection />
      {error ? (
        <div className="ts-container py-10"><div className="ts-card"><ErrorState text={error} onRetry={reload} /></div></div>
      ) : (
        <>
          <TrustStats />
          <CategoryGrid />
          <FeaturedProducts />
          <ReadyToShip />
          <SupplierShowcase />
          <WholesaleDeals />
          <IndustrySection />
          <PromoBanners />
          <ManufacturerShowcase />
          <WhyChoose />
          <HowItWorks />
        </>
      )}
      <SupplierCTA />
      <Newsletter />
    </>
  );
}
