import { z } from "zod";

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(1, { message: "Fullname là bắt buộc" })
      .min(3, { message: "Fullname tối thiểu 3 ký tự" }),
    email: z
      .email("Email không hợp lệ")
      .min(1, { message: "Email là bắt buộc" }),
    password: z
      .string()
      .min(8, "Tối thiểu 8 ký tự")
      .refine((val) => /[A-Z]/.test(val), {
        message: "Phải có ít nhất 1 chữ hoa",
      })
      .refine((val) => /[0-9]/.test(val), {
        message: "Phải có ít nhất 1 số",
      })
      .refine((val) => /[!@#$%^&*]/.test(val), {
        message: "Phải có ít nhất 1 ký tự đặc biệt",
      }),
    confirmPassword: z.string(),
    date_of_birth: z.coerce
      .date()
      .max(new Date(), "Không được chọn ngày tương lai")
      .refine(
        (date) => {
          const age = new Date().getFullYear() - date.getFullYear();
          return age >= 18;
        },
        { message: "Phải đủ 18 tuổi" },
      ),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu không khớp",
        path: ["confirmPassword"],
      });
    }
  });

//infer là để giúp import type từ registerSchema
export type RegisterSchemaType = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .email("Email không hợp lệ")
    .min(1, { message: "Email là bắt buộc" }),
  password: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
