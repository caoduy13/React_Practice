import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

function UnauthorizedPage() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-lg">
          {/* Error Code & Icon */}
          <div className="relative">
            <h1 className="text-9xl font-extrabold text-neutral-200 dark:text-zinc-800/80 tracking-widest">
              403
            </h1>
          </div>

          {/* Text content */}
          <div className="space-y-3 mt-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Bạn không có quyền truy cập trang này.
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Bạn không có quyền truy cập trang này.
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
    </>
  );
}

export default UnauthorizedPage;
