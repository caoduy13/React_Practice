import axios from "axios";
import { useAuthStore } from "../features/auth/store";
import { API_ENDPOINTS } from "@/shared/constants";
import { toast } from "sonner";
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // nhớ config trong .env
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000, // 10 seconds timeout
  withCredentials: true, // send cookies when cross-domain requests
});

apiClient.interceptors.request.use((config) => {
  // Cần thằng nawof thì lấy thằng đó từ zustand store
  // useAuthStore.getState() => lấy state hiện tại của store - không cần hook -> không hay đổi giữa các render
  //không sử dụng hook trong non-react function
  const accessToken = useAuthStore.getState().accessToken;
  // console.log(accessToken);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (token: string | null = null, error?: unknown) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error ?? new Error("Failed to fetch new token"));
    }
  });
  failedQueue = [];
};
apiClient.interceptors.response.use(
  (response) => {
    return response.data?.data !== undefined
      ? response.data.data
      : response.data; //do ở đây chúng ta đã chấm tới data nên ở auth.api chỉ cần chấm data không cần .data.data nữa
  },

  async (error) => {
    const originalRequest = error.config;
    // const status = error.response?.status;

    const notAuthReqs = !originalRequest.url?.includes("/auth/");
    const is401 = error.response?.status === 401;
    const notRetriedYet = !originalRequest._retry;

    if (notAuthReqs && is401 && notRetriedYet) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        });
      }
      //kiểm tra đã retry chưa
      originalRequest._retry = true; // đánh dấu đã retry
      isRefreshing = true;
      try {
        // Gọi API refresh token
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}${API_ENDPOINTS.AUTH.REFRESH}`,
          {
            withCredentials: true, // gửi kèm cookies -> accept cookies từ backend
          },
        );
        const newToken: string =
          response.data?.data?.accessToken ?? response.data?.data?.accessToken;
        // lưu accesstoken mới vào zustand store
        useAuthStore.getState().setAuth({
          accessToken: newToken,
          role: useAuthStore.getState().role,
        });

        processQueue(newToken);
        // Thực hiện lại request ban đầu với accessToken mới
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError: unknown) {
        processQueue(null, refreshError);
        // Nếu refresh token cũng lỗi, logout user
        useAuthStore.getState().clearAuth();
        toast.error("Session expired. Please login again.");
        window.location.href = "/login"; // redirect cứng to login
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    const message =
      error.response?.data?.message ?? error.message ?? "Đã có lỗi xảy ra";
    const isLogoutEndpoint = originalRequest.url?.includes("/auth/logout");
    if (!isLogoutEndpoint) {
      toast.error(message);
    }
    return Promise.reject(error);
  },
);

export default apiClient;
