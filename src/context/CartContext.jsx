import { createContext, useState, useContext, useEffect } from "react";

// Step 1: Khali dabba (Context) banaya
const CartContext = createContext();

// Step 2: Provider component — ye sab ko data dega
export function CartProvider({ children }) {
  // Step 3: Cart data — localStorage se load karo, warna khali array
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("qap_cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Step 4: Wishlist data — same logic
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("qap_wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  // Step 5: Jab cart change ho, localStorage mein save karo
  useEffect(() => {
    localStorage.setItem("qap_cart", JSON.stringify(cart));
  }, [cart]);

  // Step 6: Jab wishlist change ho, localStorage mein save karo
  useEffect(() => {
    localStorage.setItem("qap_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // ===== FUNCTIONS =====

  // Product cart mein add karna
  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        // Pehle se hai — quantity badhao
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item,
        );
      }
      // Naya product — add karo
      return [...prev, { ...product, qty }];
    });
  };

  // Product cart se hatana
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Quantity change karna (+/-)
  const updateQty = (id, qty) => {
    if (qty < 1) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty } : item)),
    );
  };

  // Cart khali karna
  const clearCart = () => setCart([]);

  // Wishlist mein add/remove karna
  const toggleWishlist = (id) => {
    setWishlist(
      (prev) =>
        prev.includes(id)
          ? prev.filter((w) => w !== id) // Hatana
          : [...prev, id], // Add karna
    );
  };

  // Check karna ke product wishlist mein hai ya nahi
  const isWishlisted = (id) => wishlist.includes(id);

  // Total price calculate karna
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Total items count (quantity included)
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  // Step 7: Sab kuch return karo taake baqi components use kar saken
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        cartTotal,
        cartCount,
        wishlist,
        toggleWishlist,
        isWishlisted,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Step 8: Shortcut hook — har component mein asani se use hoga
export function useCart() {
  return useContext(CartContext);
}
