import { useQuery } from "@tanstack/react-query";
import { authService } from "@/features/auth/services";

export const useUser = () => {
  return useQuery({
    // queryKey là bắt buộc
    queryKey: ["me"],
    // Key = Id của cache
    // cùng key = chung cache
    //khác key = khác cache

    //ví dụ
    // queryKey: ["me"] => cache1
    // queryKey: ["me", 1] => cache2
    // queryKey: ["me", 2] => cache3

    //Key là array vì:
    //1. Dễ nest: ["posts", {userId: 1}, "comments"]
    //2. Dễ query so sánh array theo giá trị
    //3. Dễ invalidate  theo pattern

    queryFn: authService.getMe,
    // Query Function concept:
    //Hàm async trả về data
    // Chỉ chạy khi cần fetch (initial, refetch, stale)

    //ví dụ
    //queryFn: () => fetch("https://api.example.com/me").then(res => res.json())

    // Conditional fetching: enabled: false > Query không chạy enabled: true > Query chạy

    //select Option: Transform data trước khi return về component
    // Lợi ích:
    // Component chỉ re-render khi data thay đổi
    // Tách logic transform data ra khỏi component

    //refetchInterval: 10000, // 10s
    // Tự động refetch sau mỗi 10s
    //
  });
};
