import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //config mặc định cho tất cả các query
      //1. Refetch on window focus
      refetchOnWindowFocus: false,
      // Mặc định: true (tự fetch lại khi user quay lại tab)
      //Học: tắt dễ debug
      //Production: Bật lại để data luôn mới
      //2. Retry on error
      retry: 1,
      // Mặc định: 3 (tự retry 3 lần khi có lỗi)
      //Học: tắt để tránh lỗi lặp lại
      //Production: 2-3 là hợp lý

      //3. Stale time
      staleTime: 1000 * 60 * 0,
      // thời gian data trở thành cũ (không fetch lại)
      // Mặc định: 0 (data luôn được coi là stale)
      //Học: 1 phút (data mới trong 5 phút)
      //Production: 30s-5 phút tùy dữ liệu
      //4. gcTime
      gcTime: 5 * 60 * 1000,
      // thời gian data sẽ bị xóa khỏi cache
      // Mặc định: 5 phút (data sẽ bị xóa sau 5 phút không sử dụng)
      //Học: 5 phút (data sẽ bị xóa sau 5 phút không sử dụng)
      //Production: 5-10 phút tùy dữ liệu
    },
  },
});
