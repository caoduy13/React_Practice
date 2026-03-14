import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/shared/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import { Separator } from "@/shared/components/ui/separator";
import { Mail, ShieldCheck, Fingerprint, Loader2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useUser } from "@/features/users/hooks/useProfile";
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/shared/components/ui/StatusState";

const ProfilePage: React.FC = () => {
  const {
    data: user, //rename data to user
    isLoading, // true = lần đầu fetch
    isError, // true = fetch lỗi
    error, // error object
    refetch, // function to refetch
    isFetching, // true = đang fetch (kể cả lần đầu hay refetch)
  } = useUser();

  /*
  [First load]
  isLoading = true
  isFetching = true
  isError = false
  error = null
  data = undefined

  [After fetch success]
  isLoading = false
  isFetching = false
  isError = false
  error = null
  data = user

  [After fetch error]
  isLoading = false
  isFetching = false
  isError = true
  error = {message, status}
  data = undefined

  [After refetch]
  isLoading = false
  isFetching = true
  isError = false
  error = null
  data {old data } -> UI vẫn render data cũ
  
   */

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <ErrorState
          message={error?.message || "Đã có lỗi xảy ra"}
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <EmptyState message="No user data avaliable" />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      {/* Card container với độ rộng tối đa md và shadow lớn */}
      <Card className="w-full max-w-md shadow-lg">
        {/* Header của Card, căn giữa các phần tử theo cột */}
        <CardHeader className="flex flex-col items-center gap-4">
          {/* Avatar component, kích thước h-20 w-20 (80px) */}
          <Avatar className="h-20 w-20">
            {/* Ảnh Avatar được sinh ngẫu nhiên từ dicebear dựa trên email */}
            <AvatarImage
              src={`https://api.dicebear.com/9.x/bottts/svg`}
              alt="@shadcn"
            />
            {/* Fallback hiển thị chữ cái đầu tiên của tên nếu ảnh lỗi */}
            <AvatarFallback>
              {user?.fullName?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {/* Container cho Tên và Badge */}
          <div className="flex flex-col items-center gap-1">
            {/* Tên người dùng, font đậm, size lớn */}
            <CardTitle className="text-2xl font-bold">
              {user?.fullName}
            </CardTitle>
            {/* Badge "Verified Account" màu xanh lá, style custom cho dark/light mode */}
            <Badge
              variant="secondary"
              className="gap-1 bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400"
            >
              {/* Icon ShieldCheck kích thước nhỏ */}
              <ShieldCheck className="h-3 w-3" />
              Verified Account
            </Badge>
          </div>
        </CardHeader>
        {/* Phần nội dung chính của Card, các phần tử cách nhau không gian y-4 */}
        <CardContent className="space-y-4">
          {/* Section: Email Address */}
          <div className="flex items-center gap-3 p-3 rounded-lg border bg-card text-card-foreground shadow-sm">
            {/* Icon Mail nằm trong vòng tròn background mờ */}
            <div className="p-2 bg-primary/10 rounded-full">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            {/* Thông tin Email */}
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground uppercase font-semibold">
                Email Address
              </span>
              <span className="text-sm font-medium">{user?.email}</span>
            </div>
          </div>

          {/* Đường kẻ ngang phân cách */}
          <Separator className="my-4" />

          {/* Section: User ID */}
          <div className="flex items-center gap-3 p-3 rounded-lg border bg-card text-card-foreground shadow-sm">
            {/* Icon Fingerprint */}
            <div className="p-2 bg-primary/10 rounded-full">
              <Fingerprint className="h-5 w-5 text-primary" />
            </div>
            {/* Thông tin ID người dùng */}
            <div className="flex flex-col w-full">
              <span className="text-xs text-muted-foreground uppercase font-semibold">
                User ID
              </span>
              {/* Hiển thị ID dạng code block với background màu muted */}
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold mt-1 block w-fit">
                {user?.id}
              </code>
            </div>
          </div>
        </CardContent>
        <Button
          onClick={() => refetch()}
          disabled={isFetching}
          variant="outline"
          className="relative"
        >
          {isFetching && <Loader2 className="animate-spin" />}
          Refetch
        </Button>
      </Card>
    </div>
  );
};
export default ProfilePage;
