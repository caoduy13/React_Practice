import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "../components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-lg">
        {/* Error Code & Icon */}
        <div className="relative">
          <h1 className="text-9xl font-extrabold text-neutral-200 dark:text-zinc-800/80 tracking-widest">
            404
          </h1>
        </div>

        {/* Text content */}
        <div className="space-y-3 mt-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Trang không tìm thấy
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Xin lỗi, trang bạn đang tìm kiếm không tồn tại, đã đổi tên hoặc tạm
            thời không thể truy cập.
          </p>
        </div>

        {/* Action Button */}
        <Button>
          <Link to="/" className="flex items-center gap-2">
            <Home />
            Trở về Trang chủ
          </Link>
        </Button>
      </div>
    </div>
  );
}
