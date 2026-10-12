import { Heart, Trash2 } from 'lucide-react';
import { SectionHeading } from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import ProductGrid from '../../components/products/ProductGrid';
import useWishlist from '../../hooks/useWishlist';
import useProducts from '../../hooks/useProducts';
import useDisclosure from '../../hooks/useDisclosure';
import useDocumentTitle from '../../hooks/useDocumentTitle';

/** Saved products. Used inside the buyer dashboard and as the public /wishlist page. */
export default function BuyerWishlist({ standalone = false }) {
  const { items, clearWishlist } = useWishlist();
  const { loading } = useProducts();
  const dialog = useDisclosure();
  useDocumentTitle('Saved products');

  const content = (
    <>
      <SectionHeading
        title="Saved products" description={items.length ? `${items.length} ${items.length === 1 ? 'product' : 'products'} saved in this browser.` : 'Tap the heart on any product to save it here.'}
        actions={items.length ? <Button variant="dangerOutline" size="sm" icon={Trash2} onClick={dialog.onOpen}>Clear all</Button> : null}
      />
      <ProductGrid
        products={items} loading={loading} skeletonCount={4} columns={standalone ? undefined : 'grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3'}
        emptyTitle="No saved products yet" emptyText="Save products while you browse to compare them later." emptyAction={<Button to="/products" variant="navy" icon={Heart}>Find products to save</Button>}
      />
      <ConfirmDialog open={dialog.open} onCancel={dialog.onClose} onConfirm={() => { clearWishlist(); dialog.onClose(); }} title="Remove all saved products?" text="Your wishlist will be emptied." confirmLabel="Remove all" />
    </>
  );
  return standalone ? <div className="ts-container py-8">{content}</div> : content;
}
