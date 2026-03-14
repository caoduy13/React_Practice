import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, User, Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import { authService } from "../services";
import type { RegisterRequest } from "../types";

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

function RegisterForm() {
  console.log("Render nè ku");

  const navigate = useNavigate();

  const [formData, setFormData] = useState<RegisterRequest>({
    fullName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidaionErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
  }>({});

  const validateForm = (): boolean => {
    const errors: typeof validationErrors = {};
    // Tạo ra object dùng để lưu lỗi tránh việc react re-render component lại nhiều lần
    if (!formData.fullName?.trim()) {
      errors.fullName = "Họ và tên không được để trống";
    } else if (formData.fullName.length < 3) {
      errors.fullName = "Họ và tên phải có ít nhất 3 ký tự";
    }
    if (!formData.email.trim()) {
      errors.email = "Email không được để trống";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Email không hợp lệ";
    }
    if (!formData.password.trim()) {
      errors.password = "Mật khẩu không được để trống";
    } else if (formData.password.length < 6) {
      errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }
    setValidaionErrors(errors);
    //mảng Error gồm key và value -> ví dụ [{fullName: "Họ và tên không được để trống"},...]
    return Object.keys(errors).length === 0; // Return true if no errors
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //Nếu validateForm() trả về false -> có lỗi
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await authService.register(formData);
      console.log("Registration success:", response);
      toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/login");
    } catch (err: unknown) {
      console.error("Registration error:", err);
      const errorMessage = getErrorMessage(
        err,
        "Đăng ký thất bại, vui lòng thử lại",
      );
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Hàm dùng để update state -> phân rã thg ban đầu và dán đè dữ liệu mới lên
  const handleChange = (field: keyof RegisterRequest, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    //xóa lỗi khi re render
    if (validationErrors[field as keyof typeof validationErrors]) {
      setValidaionErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="space-y-2">
          <label
            htmlFor="fullName"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <User className="w-4 h-4" />
            HỌ VÀ TÊN
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            placeholder="Nguyễn Văn A"
            // e là event
            onChange={(e) => handleChange("fullName", e.target.value)}
            // required -> tự động validate khi chưa submit
            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {validationErrors.fullName && (
            <p className="text-destructive text-sm mt-1">
              {validationErrors.fullName}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <Mail className="w-4 h-4" />
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            placeholder="nguyenvana@gmail.com"
            onChange={(e) => handleChange("email", e.target.value)}
            // required
            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {validationErrors.email && (
            <p className="text-destructive text-sm mt-1">
              {validationErrors.email}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <Lock className="w-4 h-4" />
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            placeholder="**********"
            onChange={(e) => handleChange("password", e.target.value)}
            // required
            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {validationErrors.password && (
            <p className="text-destructive text-sm mt-1">
              {validationErrors.password}
            </p>
          )}
        </div>

        {error && (
          <div className="text-destructive text-sm text-center">{error}</div>
        )}

        <button
          type="submit"
          className="w-full bg-slate-900 text-slate-50 py-2 rounded-md hover:bg-slate-800 disabled:opacity-50 flex justify-center items-center"
          disabled={loading}
        >
          {/* {loading ? "Đang xử lý" : "Đăng ký"} */}
          {loading ? (
            <Loader2 className="animate-spin mr-2 h-4 w-4" />
          ) : (
            "Đăng ký"
          )}
        </button>

        <div className="text-center text-sm">
          <span>Đã có tài khoản? </span>
          <Link to="/login" className="text-blue-500 hover:underline">
            Đăng nhập ngay
          </Link>
        </div>
      </form>
    </>
  );
}

export default RegisterForm;
