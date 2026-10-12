import { createContext, useCallback, useContext, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../utils/constants';
import { ProductContext } from './ProductContext';
import { NotificationContext } from './NotificationContext';

export const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const { products } = useContext(ProductContext);
  const { showToast } = useContext(NotificationContext);
  const [ids, setIds] = useLocalStorage(STORAGE_KEYS.wishlist, []);

  const isSaved = useCallback((productId) => ids.includes(productId), [ids]);

  const toggleWishlist = useCallback((product) => {
    const saved = ids.includes(product.id);
    setIds((previous) => (saved ? previous.filter((id) => id !== product.id) : [product.id, ...previous.filter((id) => id !== product.id)]));
    showToast(saved ? 'Removed from saved products.' : 'Saved to your wishlist.', saved ? 'info' : 'success');
  }, [ids, setIds, showToast]);

  const clearWishlist = useCallback(() => setIds([]), [setIds]);

  // Products that were deleted from the catalogue simply drop out of the list.
  const items = useMemo(() => ids.map((id) => products.find((product) => product.id === id)).filter(Boolean), [ids, products]);

  const value = useMemo(() => ({ ids, items, count: items.length, isSaved, toggleWishlist, clearWishlist }), [ids, items, isSaved, toggleWishlist, clearWishlist]);
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}
