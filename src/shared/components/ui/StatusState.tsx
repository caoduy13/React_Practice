import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses: Record<NonNullable<LoadingSpinnerProps["size"]>, string> = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

export const LoadingSpinner = ({
  className = "",
  size = "md",
}: LoadingSpinnerProps) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 className={`${sizeClasses[size]} animate-spin`} />
    </div>
  );
};

export const LoadingState = () => {
  return <div>Loading...</div>;
};

export const ErrorState = ({
  message = "Đã có lỗi xảy ra",
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) => {
  return (
    <div>
      <p>System Error</p>
      <p>{message}</p>

      <button
        className="px-4 py-2 bg-red-500 text-white rounded"
        onClick={onRetry}
      >
        Retry Connection
      </button>
    </div>
  );
};

export const EmptyState = ({
  title,
  description,
  message = "No data available",
}: {
  title?: string;
  description?: string;
  message?: string;
}) => {
  return (
    <div className="text-center">
      <p className="font-semibold">{title ?? "Empty Data"}</p>
      <p className="text-muted-foreground">{description ?? message}</p>
    </div>
  );
};
