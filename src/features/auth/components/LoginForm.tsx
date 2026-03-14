// import React from "react
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Loader2 } from "lucide-react";
import { loginSchema, type LoginSchemaType } from "../schema";
import { useLoginMutation } from "../hooks/useAuth";

function LoginForm() {
  const loginMutation = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "thichcungkiengg@gmail.com",
      password: "password123",
    },
  });

  const onSubmit = async (data: LoginSchemaType) => {
    // setLoading(true);
    // try {
    //   // Giả sử API login nhận { email, password }
    //   const tokens = await authService.login({
    //     email: data.email,
    //     password: data.password,
    //   });
    //   setTokens(tokens.accessToken, tokens.refreshToken);
    //   toast.success("Login thành công");
    //   navigate(from, { replace: true });
    // } catch (err: any) {
    //   console.error(err);
    //   toast.error(
    //     err.response?.data?.message || "Login failed. Please try again.",
    //   );
    // } finally {
    //   setLoading(false);
    // }
    loginMutation.mutate(data);
  };

  return (
    <>
      {" "}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
            {...register("email")}
            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-destructive text-sm mt-1">
              {errors.email.message}
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
            {...register("password")}
            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-destructive text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" id="rememberMe" className="w-4 h-4" />
          <label htmlFor="rememberMe" className="text-sm font-medium">
            Remember me
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-slate-900 text-slate-50 py-2 rounded-md hover:bg-slate-800 disabled:opacity-50 flex justify-center items-center"
          disabled={loginMutation.isPending}
        >
          {/* {loginMutation.isPending ? "Đang xử lý" : "Đăng ký"} */}
          {loginMutation.isPending ? (
            <Loader2 className="animate-spin mr-2 h-4 w-4" />
          ) : (
            "Đăng nhập"
          )}
        </button>

        <div className="text-center text-sm">
          <span>Chưa có tài khoản? </span>
          <Link to="/register" className="text-blue-500 hover:underline">
            Đăng kí ngay
          </Link>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
