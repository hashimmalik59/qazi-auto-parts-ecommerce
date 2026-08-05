import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { db, collection, query, where, getDocs } from "../firebase";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  // 🔥 User ke orders fetch karo Firestore se
  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const q = query(
          collection(db, "orders"),
          where("userId", "==", user.uid),
        );
        const querySnapshot = await getDocs(q);
        const ordersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersList);
        setOrdersLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrdersLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-gray-500">
        <i className="fas fa-spinner fa-spin text-4xl text-[#d4af37]"></i>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-gray-500">
        <p className="mb-4">You are not logged in.</p>
        <Link
          to="/login"
          className="bg-[#d4af37] text-black font-bold py-2 px-6 rounded-lg hover:bg-white transition"
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex flex-col items-center px-4 py-10 gap-8">
      {/* 🔥 My Profile Section (Upar) */}
      <div className="bg-[#111] border-2 border-[#d4af37]/30 rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-black italic text-[#d4af37] mb-6 text-center">
          My Profile
        </h2>

        <div className="space-y-4">
          <div className="border-b border-[#333] pb-3">
            <p className="text-gray-400 text-xs uppercase font-bold">Email</p>
            <p className="text-white font-medium break-all">{user.email}</p>
          </div>

          <div className="border-b border-[#333] pb-3">
            <p className="text-gray-400 text-xs uppercase font-bold">User ID</p>
            <p className="text-gray-300 text-sm break-all">{user.uid}</p>
          </div>

          {/* WhatsApp Support Button */}
          <div className="pt-2">
            <a
              href="https://wa.me/8615158939407?text=Hi, I need help with my account"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition font-bold"
            >
              <i className="fab fa-whatsapp text-xl"></i>
              Contact Support
            </a>
          </div>
        </div>
      </div>

      {/* 🔥 Order History Section (Neeche) */}
      <div className="w-full max-w-md">
        <h3 className="text-xl font-bold text-[#d4af37] mb-4">Order History</h3>

        {ordersLoading ? (
          <p className="text-gray-400 text-sm">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-400 text-sm">No orders placed yet.</p>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-[#111] border border-[#333] rounded-xl p-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full ${
                      order.status === "pending"
                        ? "bg-yellow-500/20 text-yellow-500"
                        : "bg-green-500/20 text-green-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="space-y-1">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-sm text-gray-300"
                    >
                      <span>
                        {item.name} x{item.quantity}
                      </span>
                      <span>${item.total.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[#333] mt-2 pt-2 flex justify-between font-bold text-[#d4af37]">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
