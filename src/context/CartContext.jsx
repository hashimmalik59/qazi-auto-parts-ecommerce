import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // 🔥 Firestore se data uthana (Jab user login ho)
  useEffect(() => {
    if (!user) {
      setCart([]);
      setWishlist([]);
      setLoading(false);
      return;
    }

    const userDocRef = doc(db, "users", user.uid);

    // Real-time listener (Data change par automatically update)
    const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setCart(data.cart || []);
        setWishlist(data.wishlist || []);
      } else {
        // Agar user ka document nahi hai, toh create karo
        setDoc(userDocRef, { cart: [], wishlist: [] });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // 🛒 Cart mein add karna (Quantity increment version)
  const addToCart = async (product) => {
    if (!user) return;
    const userDocRef = doc(db, "users", user.uid);

    // Check if product already exists in cart
    const existingItem = cart.find((item) => item.id === product.id);

    let updatedCart;

    if (existingItem) {
      // Agar already hai, toh quantity +1 karo (Poora array update karo, arrayUnion nahi)
      updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    } else {
      // Naya product add karo (quantity 1 ke saath)
      const newItem = { id: product.id, quantity: 1 };
      updatedCart = [...cart, newItem];
    }

    // 🔥 Firestore mein directly updatedCart set karo (arrayUnion use mat karo)
    await updateDoc(userDocRef, { cart: updatedCart });
    setCart(updatedCart);
  };

  // 🛒 Cart se remove karna (Fixed version)
  const removeFromCart = async (productId) => {
    if (!user) return;
    if (!productId) return;
    const userDocRef = doc(db, "users", user.uid);

    const existingItem = cart.find((item) => item.id === productId);

    if (!existingItem) return;

    let updatedCart;

    if (existingItem.quantity > 1) {
      // Agar quantity 1 se zyada hai, toh quantity -1 karo
      updatedCart = cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
      );
    } else {
      // Agar quantity 1 hai, toh item ko poora hata do
      updatedCart = cart.filter((item) => item.id !== productId);
    }

    // 🔥 Firestore mein directly updatedCart set karo
    await updateDoc(userDocRef, { cart: updatedCart });
    setCart(updatedCart);
  };

  // 🗑️ Cart se poora product hata do (chahe quantity kuch bhi ho)
  const removeFromCartCompletely = async (productId) => {
    if (!user) return;
    if (!productId) return;
    const userDocRef = doc(db, "users", user.uid);

    // Cart mein se poora item hata do
    const updatedCart = cart.filter((item) => item.id !== productId);

    await updateDoc(userDocRef, { cart: updatedCart });
    setCart(updatedCart);
  };

  // 🗑️ Clear whole cart
  const clearCart = async () => {
    if (!user) return;
    const userDocRef = doc(db, "users", user.uid);
    try {
      await updateDoc(userDocRef, {
        cart: [],
      });
      setCart([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  // ❤️ Wishlist mein add karna (Duplicate-safe version)
  const addToWishlist = async (productId) => {
    if (!user) return;
    // 🔥 Agar product already wishlist mein hai, toh kuch mat karo
    if (wishlist.includes(productId)) {
      return;
    }
    const userDocRef = doc(db, "users", user.uid);
    await updateDoc(userDocRef, {
      wishlist: arrayUnion(productId),
    });
    // 🔥 UI update karne se pehle check karo ki duplicate to nahi hai
    setWishlist((prev) => {
      if (prev.includes(productId)) return prev; // Already hai toh return
      return [...prev, productId];
    });
  };

  // ❤️ Wishlist se remove karna (Safe version)
  const removeFromWishlist = async (productId) => {
    if (!user) return;
    if (!productId) return; // 🔥 Agar ID undefined hai toh return
    const userDocRef = doc(db, "users", user.uid);
    await updateDoc(userDocRef, {
      wishlist: arrayRemove(productId),
    });
    setWishlist((prev) => prev.filter((id) => id !== productId));
  };

  // 🗑️ Clear whole wishlist
  const clearWishlist = async () => {
    if (!user) return;
    const userDocRef = doc(db, "users", user.uid);
    await updateDoc(userDocRef, {
      wishlist: [],
    });
    setWishlist([]);
  };

  // 📦 Calculate cart count (quantity ke hisaab se)
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // 📦 Check if product is in cart
  const isInCart = (productId) => cart.some((item) => item.id === productId);

  // 📦 Check if product is in wishlist
  const isInWishlist = (productId) => wishlist.includes(productId);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        loading,
        addToCart,
        removeFromCart,
        removeFromCartCompletely,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInCart,
        isInWishlist,
        cartCount,
        wishlistCount: wishlist.length,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
