import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cart, removeFromCart, updateQty, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  // WhatsApp pe poora cart bhejna
  const checkoutWhatsApp = () => {
    const items = cart
      .map(
        (item) =>
          `• ${item.name} (SKU: ${item.sku}) x${item.qty} = $${item.price * item.qty}`,
      )
      .join("\n");

    const message = `Hi Qazi Auto Parts, I want to place an order:\n\n${items}\n\n*Total: $${cartTotal}*\n\nPlease confirm availability and shipping cost.`;
    window.open(
      `https://wa.me/8615158939407?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  if (cart.length === 0) {
    return (
      <div className="animate-fade-in pt-20 pb-24 md:pb-10 text-center px-4">
        <div className="max-w-md mx-auto">
          <i className="fas fa-shopping-cart text-6xl text-gray-800 mb-6"></i>
          <h2 className="text-2xl font-bold text-white mb-2">
            Your Cart is Empty
          </h2>
          <p className="text-gray-500 mb-8">Add some products to get started</p>
          <Link
            to="/products"
            className="bg-[#d4af37] text-black px-8 py-3 rounded-full font-bold hover:bg-white transition inline-block"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in pt-10 pb-24 md:pb-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-black italic text-[#d4af37] mb-8">
          Shopping Cart ({cart.length} items)
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-[#111] border border-[#222] rounded-2xl p-4 flex gap-4 items-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-contain bg-black rounded-xl"
                  onError={(e) => {
                    e.target.src = "/Assets/placeholder.png";
                  }}
                />

                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-gray-500 uppercase font-bold">
                    {item.sku}
                  </p>
                  <h3 className="text-white font-bold truncate">{item.name}</h3>
                  <p className="text-[#d4af37] font-bold">${item.price}</p>
                </div>

                {/* Quantity +/- */}
                <div className="flex items-center border border-[#d4af37]/30 rounded-lg">
                  <button
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    className="px-3 py-1 text-[#d4af37]"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-white font-bold text-sm">
                    {item.qty}
                  </span>
                  <button
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    className="px-3 py-1 text-[#d4af37]"
                  >
                    +
                  </button>
                </div>

                <div className="text-right min-w-[60px]">
                  <p className="text-white font-bold">
                    ${item.price * item.qty}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-xs hover:text-red-400 mt-1"
                  >
                    <i className="fas fa-trash"></i> Remove
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-gray-500 text-sm hover:text-red-500 transition"
            >
              <i className="fas fa-trash-alt mr-1"></i> Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="bg-[#111] border border-[#222] rounded-2xl p-6 h-fit">
            <h3 className="text-white font-bold text-lg mb-4">Order Summary</h3>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Subtotal</span>
                <span>${cartTotal}</span>
              </div>
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Shipping</span>
                <span>Calculated later</span>
              </div>
            </div>

            <div className="border-t border-[#222] pt-4 mb-6">
              <div className="flex justify-between text-white font-bold text-xl">
                <span>Total</span>
                <span className="text-[#d4af37]">${cartTotal}</span>
              </div>
            </div>

            <button
              onClick={checkoutWhatsApp}
              className="w-full py-3 rounded-xl bg-[#25D366] text-white font-black uppercase text-sm tracking-tighter hover:bg-[#1da851] transition mb-3 flex items-center justify-center gap-2"
            >
              <i className="fab fa-whatsapp"></i> Checkout via WhatsApp
            </button>

            <button
              onClick={() => navigate("/products")}
              className="w-full py-3 rounded-xl border border-[#d4af37] text-[#d4af37] font-bold text-sm hover:bg-[#d4af37] hover:text-black transition"
            >
              Continue Shopping
            </button>

            <p className="text-gray-600 text-[10px] text-center mt-4">
              *Shipping cost will be confirmed by our team after order
              placement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
