import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email, password);
      showToast("Welcome back!", "success");
      navigate("/");
    } catch (error) {
      // Error message ko clean kar diya hai
      showToast(error.message || "Invalid email or password", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
      <div className="bg-[#111] border-2 border-[#d4af37]/30 rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-black italic text-[#d4af37] mb-2 text-center">
          Welcome Back
        </h2>
        <p className="text-gray-500 text-sm text-center mb-6">
          Login to your Qazi Auto Parts account
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-400 text-xs uppercase font-bold block mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-[#333] rounded-lg px-4 py-3 text-white focus:border-[#d4af37] focus:outline-none transition"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="text-gray-400 text-xs uppercase font-bold block mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-[#333] rounded-lg px-4 py-3 text-white focus:border-[#d4af37] focus:outline-none transition pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#d4af37] transition"
              >
                <i
                  className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                ></i>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#d4af37] text-black font-black uppercase text-sm tracking-tighter py-3 rounded-lg hover:bg-white transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-gray-500 text-sm text-center mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[#d4af37] font-bold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
