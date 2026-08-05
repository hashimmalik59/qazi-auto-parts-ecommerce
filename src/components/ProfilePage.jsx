import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-gray-500">
        Loading profile...
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
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
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
        </div>
      </div>
    </div>
  );
}
