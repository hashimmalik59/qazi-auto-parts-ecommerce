import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { products } from "../data/products";

export default function CartPage() {
  const {
    cart,
    addToCart,
    removeFromCart,
    removeFromCartCompletely,
    clearCart,
    cartCount,
  } = useCart();
  const { user } = useAuth();
  const { showToast } = useToast();

  const cartItems = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) return null;
      return { ...product, quantity: item.quantity };
    })
    .filter((item) => item !== null);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-gray-400">
        <i className="fas fa-shopping-cart text-6xl mb-4 text-[#d4af37]"></i>
        <p className="text-xl font-bold mb-2">Please login to view your cart</p>
        <Link
          to="/login"
          className="bg-[#d4af37] text-black font-bold py-2 px-6 rounded-lg hover:bg-white transition"
        >
          Login
        </Link>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-gray-400">
        <i className="fas fa-shopping-cart text-6xl mb-4 text-gray-600"></i>
        <p className="text-xl font-bold mb-2">Your cart is empty</p>
        <Link
          to="/products"
          className="bg-[#d4af37] text-black font-bold py-2 px-6 rounded-lg hover:bg-white transition"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-black italic text-[#d4af37]">
            Shopping Cart
          </h2>
          <p className="text-gray-400">{cartCount} items in cart</p>
        </div>

        {cartItems.length > 0 && (
          <button
            onClick={async () => {
              if (
                window.confirm(
                  "Are you sure you want to clear your entire cart?",
                )
              ) {
                await clearCart();
                showToast("Cart cleared!", "info");
              }
            }}
            className="px-4 py-2 bg-red-600/20 border border-red-500 text-red-500 font-bold text-sm rounded-lg hover:bg-red-500 hover:text-white transition"
          >
            Clear Cart
          </button>
        )}
      </div>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="bg-[#111] border border-[#333] rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4"
          >
            <div className="w-20 h-20 bg-black rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.src = "/Assets/placeholder.png";
                }}
              />
            </div>
            <div className="flex-1 text-center sm:text-left w-full">
              <h3 className="text-[#d4af37] font-bold">{item.name}</h3>
              <p className="text-sm text-gray-400">SKU: {item.sku}</p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-1">
                <span className="text-white font-bold">${item.price}</span>
                <span className="text-gray-500 text-sm">x {item.quantity}</span>
              </div>
              <p className="text-[#d4af37] font-bold mt-1">
                = ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-2 sm:mt-0 justify-center sm:justify-end w-full sm:w-auto">
              <button
                onClick={() => removeFromCart(item.id)}
                className="px-3 py-1 bg-red-500/10 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition"
              >
                -
              </button>
              <button
                onClick={() => addToCart({ id: item.id })}
                className="px-3 py-1 bg-[#d4af37]/10 border border-[#d4af37] text-[#d4af37] rounded hover:bg-[#d4af37] hover:text-black transition"
              >
                +
              </button>
              <button
                onClick={() => {
                  removeFromCartCompletely(item.id);
                  showToast("Removed from cart", "info");
                }}
                className="px-4 py-2 bg-red-500/20 border border-red-500 text-red-500 font-bold text-sm rounded-lg hover:bg-red-500 hover:text-white transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-[#111] border border-[#d4af37]/30 rounded-xl">
        <div className="flex justify-between items-center text-lg font-bold">
          <span className="text-gray-400">Total:</span>
          <span className="text-[#d4af37] text-2xl">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
        <button
          onClick={() => {
            const message = cartItems
              .map(
                (item) =>
                  `- ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`,
              )
              .join("\n");
            const totalMsg = `Total: $${totalPrice.toFixed(2)}`;
            const whatsappUrl = `https://wa.me/8615158939407?text=Hi, I want to place an order:%0A%0A${encodeURIComponent(message)}%0A%0A${encodeURIComponent(totalMsg)}`;
            window.open(whatsappUrl, "_blank");
          }}
          className="w-full mt-4 bg-[#d4af37] text-black font-black py-3 rounded-lg hover:bg-white transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
