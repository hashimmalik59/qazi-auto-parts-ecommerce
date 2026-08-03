import { useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const location = useLocation();

  // Agar page '/login' ya '/register' hai toh header/footer mat dikhao
  const hideHeaderFooter =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div>
      {/* Agar hideHeaderFooter false hai tabhi Navbar dikhao */}
      {!hideHeaderFooter && children[0]}

      {/* Main content */}
      {children[1]}

      {/* Agar hideHeaderFooter false hai tabhi Footer dikhao */}
      {!hideHeaderFooter && children[2]}
    </div>
  );
}
