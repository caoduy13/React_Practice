import { useAuthStore } from "@/features/auth/store";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
interface GuestRouteProps {
  children: ReactNode;
}
//children nó nói là cái component có thể nhận tag (component) khác làm con
//react node là tất cả những gì ta thấy trên giao diện

function GuestRoute({ children }: GuestRouteProps) {
  const { accessToken, role } = useAuthStore();
  if (accessToken) {
    const redirectTo = role === "admin" ? "/admin" : "/profile";
    return <Navigate to={redirectTo} replace />;
  }
  return <>{children}</>;
}

export default GuestRoute;
