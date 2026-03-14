import { Link, NavLink } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store";
import Logout from "@/features/auth/components/Logout";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function Header() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const isDark = theme === "system" ? resolvedTheme === "dark" : theme === "dark";

  return (
    <header className="bg-gradient-to-r from-[#c4956a] via-[#d4a5a5] to-[#c4956a] dark:from-[#3d2820] dark:via-[#4a2c2a] dark:to-[#3d2820] text-white shadow-md border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tight drop-shadow-sm">
          Sweet Crumbs
        </Link>
        <nav className="hidden md:flex gap-6 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-white font-semibold underline underline-offset-4"
                : "text-white/80 hover:text-white"
            }
          >
            Trang chủ
          </NavLink>
          <NavLink
            to="/rituals"
            className={({ isActive }) =>
              isActive
                ? "text-white font-semibold underline underline-offset-4"
                : "text-white/80 hover:text-white"
            }
          >
            Thực đơn bánh
          </NavLink>
          {!accessToken && (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold underline underline-offset-4"
                  : "text-white/80 hover:text-white"
              }
            >
              Đăng nhập
            </NavLink>
          )}
        </nav>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/30 bg-white/15 text-white transition hover:bg-white/25 dark:border-white/20"
            aria-label={isDark ? "Chuyen sang che do sang" : "Chuyen sang che do toi"}
            title={isDark ? "Che do sang" : "Che do toi"}
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          {accessToken ? (
            <Logout />
          ) : (
            <Link
              to="/login"
              className="bg-white/95 text-[#8b5a3c] px-4 py-2 rounded-lg font-semibold hover:bg-white shadow-sm transition dark:bg-[#f5e6d3] dark:text-[#3d2820] dark:hover:bg-[#faf0e6]"
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
