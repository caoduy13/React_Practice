import { LogOut } from "lucide-react";
import { Button } from "../../../shared/components/ui/button";
import { useLogoutMutation } from "@/features/auth/hooks/useAuth";

function Logout() {
  const { mutate: logout, isPending } = useLogoutMutation();

  return (
    <Button
      variant="destructive"
      onClick={() => logout()}
      disabled={isPending}
      size="sm"
      className="gap-2"
    >
      <LogOut className="w-4 h-4" />
      {isPending ? "Đang đăng xuất..." : "Đăng xuất"}
    </Button>
  );
}

export default Logout;
