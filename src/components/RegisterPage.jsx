import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showToast("Passwords do not match!", "error");
      return;
    }
    setLoading(true);
    try {
      await signUp(email, password);
      showToast("Account created! Please check your email.", "success");
      navigate("/login");
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
      <div className="bg-[#111] border-2 border-[#d4af37]/30 rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-black italic text-[#d4af37] mb-2 text-center">
          Create Account
        </h2>
        <p className="text-gray-500 text-sm text-center mb-6">
          Join Qazi Auto Parts today
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

          <div>
            <label className="text-gray-400 text-xs uppercase font-bold block mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-black border border-[#333] rounded-lg px-4 py-3 text-white focus:border-[#d4af37] focus:outline-none transition pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#d4af37] transition"
              >
                <i
                  className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}
                ></i>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#d4af37] text-black font-black uppercase text-sm tracking-tighter py-3 rounded-lg hover:bg-white transition disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-gray-500 text-sm text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#d4af37] font-bold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
