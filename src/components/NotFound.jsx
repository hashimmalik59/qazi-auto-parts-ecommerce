import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-8xl md:text-9xl font-black italic text-[#d4af37] mb-4">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-500 mb-8 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-[#d4af37] text-black px-8 py-3 rounded-full font-black text-sm uppercase hover:bg-white transition shadow-lg shadow-yellow-600/20"
      >
        <i className="fas fa-home mr-2"></i> Back to Home
      </Link>
    </div>
  );
}
