import { authService } from "../services";
import { useAuthStore } from "../store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { AuthResponse, LoginRequest } from "../types";
import { jwtDecode } from "jwt-decode";
import type { UserRole } from "@/shared/types";

interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
}

const getErrorMessage = (error: unknown, fallback: string) => {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as { response?: { data?: { message?: unknown } } }).response
      ?.data?.message === "string"
  ) {
    return (error as { response?: { data?: { message?: string } } }).response
      ?.data?.message as string;
  }

  return fallback;
};

export const useRegisterMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (userData: {
      fullName: string;
      email: string;
      password: string;
    }) => authService.register(userData),

    onSuccess: () => {
      toast.success("Đăng kí thành công", {
        description: "Vui lòng Đăng nhập để tiếp tục",
      });
      navigate("/login");
    },

    onError: (err: unknown) => {
      const message = getErrorMessage(err, "Đăng kí thất bại. Vui lòng thử lại.");
      toast.error(message || "Đăng kí thất bại. Vui lòng thử lại.");
    },

    onSettled: () => {
      // Có thể dùng để reset form hoặc các thao tác cleanup khác
    },
  });
};

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/profile";
  const setAuth = useAuthStore((state) => state.setAuth);
  return useMutation<AuthResponse, Error, LoginRequest>({
    mutationFn: (data) => authService.login(data),

    onSuccess: (res) => {
      const decoded = jwtDecode<JwtPayload>(res.accessToken);
      // Mặc định role null hoặc có thể decode từ JWT
      setAuth({ accessToken: res.accessToken, role: decoded.role });
      toast.success("Login thành công");

      if (decoded.role === "admin") {
        navigate("/admin/rituals", { replace: true }); // cho phép quay về trang trước đó
      } else {
        navigate(from, { replace: true }); // cho phép quay về trang trước đó
      }
    },

    onError: (err: unknown) => {
      toast.error(getErrorMessage(err, "Login failed. Please try again."));
    },

    onSettled: () => {
      // Có thể dùng để reset form hoặc các thao tác cleanup khác
    },
  });
};

export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  return useMutation({
    mutationFn: () => authService.logout(),

    onSuccess: () => {
      // xóa token trong store
      clearAuth();
      // xóa các query trong cache
      queryClient.removeQueries();
      navigate("/login");
      toast.success("Logout thành công");
    },

    onError: () => {
      clearAuth();
      // xóa các query trong cache
      queryClient.removeQueries();
      navigate("/login");
    },

    // onSettled: () => {
    //   // Có thể dùng để reset form hoặc các thao tác cleanup khác
    // },
  });
};
